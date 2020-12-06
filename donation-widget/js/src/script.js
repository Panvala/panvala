import * as qs from './qs';
import debug from './debug';

const INFURA_ID = process.env.INFURA_ID;
const IFRAME_HOST = process.env.IFRAME_HOST;
const TOKEN_CONTRACT_ADDRESSES = {
  1: {
    DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
    PAN: '0xd56dac73a4d6766464b38ec6d91eb45ce7457c44',
  },
  4: {
    DAI: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea',
    PAN: '',
  },
};

class Donate {
  constructor(options) {
    this.options = options;
    this.sid = Date.now();
    this.handleMessage = e => this.handleMessageBound(e);
    this.handleMessages();
    this.createIframe();
  }

  validateOptions({ to, defaultAmount, defaultAsset }) {
    // todo: validate `to` address

    // todo: validate `asset`

    // validate `amount`
    defaultAmount = Number(defaultAmount);
    if (defaultAmount <= 0) throw new Error('invalid amount');

    return {
      to,
      defaultAmount,
      defaultAsset,
    };
  }

  createIframe() {
    const { sid, options } = this;

    try {
      const url =
        IFRAME_HOST +
        '?' +
        qs.stringify({
          options: btoa(
            JSON.stringify({
              sid,
              host: location.origin,
              ...this.validateOptions(options),
            })
          ),
        });

      debug(url);

      const iframe = (this.iframe = document.createElement('iframe'));
      iframe.setAttribute('src', url);
      iframe.style.display = 'flex';
      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style['z-index'] = '1000000000';
      // iframe.style.opacity = '0';
      // iframe.style['pointer-events'] = 'none';

      document.body.appendChild(iframe);
    } catch (e) {
      this.options.onError && this.options.onError(e);
    }
  }

  showIframe(show) {
    this.iframe.style.display = show ? 'flex' : 'none';
  }

  onClose() {
    if (window.removeEventListener) {
      window.removeEventListener('message', this.handleMessage, false);
    } else {
      window.detachEvent('onmessage', this.handleMessage);
    }

    document.body.removeChild(this.iframe);
  }

  onCancel() {
    this.onClose();
    this.options.onCancel && this.options.onCancel();
  }

  async onConnectWallet(sid) {
    const { default: Web3Modal } = await import('web3modal');
    const { default: MewConnect } = await import(
      '@myetherwallet/mewconnect-web-client'
    );
    const { default: WalletConnectProvider } = await import(
      '@walletconnect/web3-provider'
    );

    this.showIframe(false);

    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: {
        mewconnect: {
          package: MewConnect,
          options: {
            infuraId: INFURA_ID,
          },
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: INFURA_ID,
          },
        },
      },
    });
    web3Modal.clearCachedProvider();
    this.web3Provider = await web3Modal.connect();
    this.web3Provider.on('accountsChanged', () => {});
    this.web3Provider.on('chainChanged', () => {});

    const { ethers } = await import('ethers');
    this.ethers = ethers;
    this.ethersProvider = new ethers.providers.Web3Provider(this.web3Provider);
    this.ethersWallet = this.ethersProvider.getSigner();

    this.postMessageToIframe(sid, 'connected', {
      address: await this.ethersWallet.getAddress(),
    });
    this.showIframe(true);
  }

  async onSend(sid, { to, amount, asset }) {
    const value = this.ethers.utils.parseEther(amount.toString());

    try {
      let transaction;
      if ('ETH' === asset) {
        transaction = await this.ethersWallet.sendTransaction({ to, value });
      } else {
        const erc20Abi = await import('./erc20_token_abi.json');
        const net = await this.ethersProvider.getNetwork();
        const tokenAddress = TOKEN_CONTRACT_ADDRESSES[net.chainId][asset];
        const contract = new this.ethers.Contract(
          tokenAddress,
          erc20Abi,
          this.ethersWallet
        );
        transaction = await contract.transfer(to, value);
      }
      this.postMessageToIframe(sid, 'sent', {
        transactionHash: transaction.hash,
      });
    } catch (err) {
      debug('error %s', err.message);
      if (err.code === 4001) {
        this.onCancel();
      } else {
        this.options.onError && this.options.onError(err);
      }
    }
  }

  handleMessages() {
    if (window.addEventListener) {
      window.addEventListener('message', this.handleMessage, false);
    } else {
      window.attachEvent('onmessage', this.handleMessage);
    }
  }

  handleMessageBound(evt) {
    let msg;
    try {
      msg = JSON.parse(evt.data);
    } catch {
      return;
    }
    debug('msg: %s', msg.sid);
    if (parseInt(msg.sid) !== parseInt(this.sid)) {
      return debug('ignoring msg(%s) self(%s)', msg.sid, this.sid);
    }
    debug('msg %o', msg);
    switch (msg.type) {
      case 'error': {
        this.options.onError(new Error(msg.payload));
        break;
      }

      case 'connect-wallet': {
        this.onConnectWallet(msg.sid);
        break;
      }

      case 'send': {
        this.onSend(msg.sid, msg.payload);
        break;
      }

      case 'complete': {
        if (this.options.onDonate) {
          this.options.onDonate(msg.payload.transactionHash);
        } else {
          this.onClose();
        }
        break;
      }

      case 'cancel': {
        this.onCancel();
        break;
      }

      default:
        debug('unknown msg type');
    }
  }

  postMessageToIframe(sid, type, payload = {}) {
    this.iframe.contentWindow.postMessage(
      JSON.stringify({ type, payload, sid }),
      IFRAME_HOST
    );
  }
}

window.panvala = function(options) {
  debug('donate');
  const donate = new Donate(options);
  return () => donate.onClose.call(donate);
};
