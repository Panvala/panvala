import _camelCase from 'lodash/camelCase';
import _bindAll from 'lodash/bindAll';
import bign from 'big.js';
import * as qs from './qs';
import debug from './debug';

const INFURA_ID = process.env.INFURA_ID;
const IFRAME_HOST = process.env.IFRAME_HOST;
const PRECISION = 4;
const ETH_ONE_INCH_ADDR = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const SLIPPAGE = 1;
const TOKEN_CONTRACT_ADDRESSES = {
  DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
  PAN: '0xd56dac73a4d6766464b38ec6d91eb45ce7457c44',
  WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
};
const COIN_GECKO_IDS = {
  ETH: 'ethereum',
  DAI: 'dai',
  PAN: 'panvala-pan',
};

window.panvala = function(options) {
  debug('donate');
  const donate = new Donate(options);
  return () => donate.close.call(donate);
};

class Donate {
  constructor(options) {
    _bindAll(this, 'handleMessage');

    this.options = options;
    this.sid = Date.now();

    this.setUpEventHandlers();
    this.createIframe();
  }

  async setUpEventHandlers() {
    this.handleMessages();
  }

  handleMessages() {
    if (window.addEventListener) {
      window.addEventListener('message', this.handleMessage, false);
    } else {
      window.attachEvent('onmessage', this.handleMessage);
    }
  }

  close() {
    if (window.removeEventListener) {
      window.removeEventListener('message', this.handleMessage, false);
    } else {
      window.detachEvent('onmessage', this.handleMessage);
    }

    document.body.removeChild(this.iframe);
  }

  handleMessage(evt) {
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
    const meth = _camelCase('on-' + msg.type);
    if (!this[meth]) return debug('unknown msg type %s', meth);
    this[meth](msg.sid, msg.payload);
  }

  postMessageToIframe(sid, type, payload = {}) {
    this.iframe.contentWindow.postMessage(
      JSON.stringify({ type, payload, sid }),
      IFRAME_HOST
    );
  }

  validateOptions({ to, defaultUSDAmount }) {
    // todo: validate `to` address

    // validate `defaultUSDAmount`
    defaultUSDAmount = Number(defaultUSDAmount);
    if (defaultUSDAmount <= 0) throw new Error('invalid default usd amount');

    return {
      to,
      defaultUSDAmount,
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

  toFixed(a, b) {
    if (this.isZero(bign(a)) || this.isZero(bign(b))) {
      return '0';
    }
    return bign(a.toString())
      .div(bign(b.toString()))
      .toFixed(PRECISION);
  }

  formatUnits(a, decimals) {
    return this.toFixed(a.toString(), bign(10).pow(decimals));
  }

  isZero(a) {
    return a.eq(bign('0'));
  }

  // bn.js
  bn(a) {
    return this.ethers.BigNumber.from(a.toString());
  }

  getSigner() {
    return this.ethersWallet || this.defaultProvider;
  }

  async getERC20Contract(asset) {
    const erc20Abi = await import('./abis/erc20.json');
    return new this.ethers.Contract(
      TOKEN_CONTRACT_ADDRESSES[asset],
      erc20Abi,
      this.getSigner()
    );
  }

  // events from js

  onError(sid, payload) {
    this.options.onError(new Error(payload));
  }

  onCancel() {
    this.close();
    this.options.onCancel && this.options.onCancel();
  }

  async onIframeLoad(sid) {
    const [{ ethers }, { address: spenderAddress }] = await Promise.all([
      import('ethers'),
      request('https://api.1inch.exchange/v2.0/approve/spender'),
    ]);

    this.ethers = ethers;
    this.defaultProvider = new this.ethers.providers.InfuraProvider(
      'homestead',
      INFURA_ID
    );

    this.spenderAddress = spenderAddress;

    this.postMessageToIframe(sid, 'iframe-load', {});
  }

  async onConnectMetamask(sid) {
    if (!window.ethereum) {
      return alert('Please install Metamask extension'); // todo: better error message or hide option
    }
    this.connectProvider(sid, window.ethereum);
  }

  async onConnectWalletConnect(sid) {
    const { default: WalletConnectProvider } = await import(
      '@walletconnect/web3-provider'
    );
    this.connectProvider(
      sid,
      new WalletConnectProvider({
        infuraId: INFURA_ID,
      })
    );
  }

  async connectProvider(sid, web3Provider) {
    await web3Provider.enable();
    this.web3Provider = web3Provider;

    web3Provider.on('accountsChanged', () => {});
    web3Provider.on('chainChanged', () => {});

    this.ethersProvider = new this.ethers.providers.Web3Provider(web3Provider);

    this.ethersWallet = this.ethersProvider.getSigner();

    const address = (this.address = await this.ethersWallet.getAddress());
    this.postMessageToIframe(sid, 'connect', { address });
  }

  async onDisconnectWallet(sid) {
    await this.web3Provider?.disconnect?.();

    this.ethersProvider = null;
    this.ethersWallet = null;
    this.address = null;

    this.postMessageToIframe(sid, 'disconnect');
  }

  async onGetQuote(sid, { fromAsset, usd: usdAmount }) {
    const fromPAN = fromAsset === 'PAN';
    const fromETH = fromAsset === 'ETH';

    let fromAssetBalance;
    let fromAssetAmount;
    let toPanAmount;
    let fromAssetContract;

    if (this.address) {
      if (fromETH) {
        fromAssetBalance = await this.ethersWallet.getBalance();
      } else {
        fromAssetContract = await this.getERC20Contract(fromAsset);
        fromAssetBalance = await fromAssetContract.balanceOf(this.address);
      }
    }
    if (fromPAN) {
      const {
        [COIN_GECKO_IDS.PAN]: { usd: panPrice },
      } = await request('https://api.coingecko.com/api/v3/simple/price', {
        ids: COIN_GECKO_IDS.PAN,
        vs_currencies: 'usd',
      });

      fromAssetAmount = toPanAmount = this.bn(
        bign(usdAmount)
          .mul(Math.pow(10, 18))
          .div(bign(panPrice))
          .toFixed(0)
      );
    } else {
      const fromAssetId = COIN_GECKO_IDS[fromAsset];
      const {
        [fromAssetId]: { usd: fromAssetPrice },
      } = await request('https://api.coingecko.com/api/v3/simple/price', {
        ids: fromAssetId,
        vs_currencies: 'usd',
      });

      fromAssetAmount = this.ethers.utils.parseEther(
        bign(usdAmount)
          .div(bign(fromAssetPrice))
          .toFixed(PRECISION)
      );

      const fromTokenAddress = fromETH
        ? ETH_ONE_INCH_ADDR
        : TOKEN_CONTRACT_ADDRESSES[fromAsset];

      const { toTokenAmount } = await request(
        'https://api.1inch.exchange/v2.0/quote',
        {
          fromTokenAddress,
          toTokenAddress: TOKEN_CONTRACT_ADDRESSES.PAN,
          amount: fromAssetAmount.toString(),
        }
      );

      toPanAmount = this.bn(toTokenAmount);
    }

    const hasSufficientBalance =
      fromAssetBalance &&
      fromAssetAmount &&
      fromAssetBalance.gte(fromAssetAmount);

    const approve =
      !fromPAN &&
      fromAssetContract &&
      fromAssetAmount &&
      fromAssetAmount.gt(
        await fromAssetContract.allowance(this.address, this.spenderAddress)
      );

    this.postMessageToIframe(sid, 'get-quote', {
      toPanAmount: toPanAmount && this.formatUnits(toPanAmount, 18),
      fromAssetAmount: fromAssetAmount && this.formatUnits(fromAssetAmount, 18),
      fromAssetBalance:
        fromAssetBalance && this.formatUnits(fromAssetBalance, 18),
      approve,
      hasSufficientBalance,
    });
  }

  async onApprove(sid, { fromAsset, fromAssetAmount }) {
    fromAssetAmount = this.ethers.utils
      .parseUnits(fromAssetAmount.toString(), 18)
      .mul(101)
      .div(100);

    const fromAssetContract = await this.getERC20Contract(fromAsset);
    try {
      const tx = await fromAssetContract.approve(
        this.spenderAddress,
        fromAssetAmount
      );
      await tx.wait();
      this.postMessageToIframe(sid, 'approve');
    } catch (err) {
      console.error(err);
      this.postMessageToIframe(sid, 'error', err);
    }
  }

  async onDonate(sid, { fromAsset, fromAssetAmount, toPanAmount, toAddress }) {
    // all assets involved have a decimal of 18
    fromAssetAmount = this.ethers.utils.parseEther(fromAssetAmount.toString());
    toPanAmount = this.ethers.utils.parseEther(toPanAmount.toString());

    const fromPAN = fromAsset === 'PAN';
    const fromETH = fromAsset === 'ETH';

    try {
      let tx;

      if (fromPAN) {
        const panContract = await this.getERC20Contract('PAN');
        tx = await panContract.transfer(toAddress, fromAssetAmount);
      } else {
        const fromAssetAddress = fromETH
          ? ETH_ONE_INCH_ADDR
          : TOKEN_CONTRACT_ADDRESSES[fromAsset];
        const toAssetAddress = TOKEN_CONTRACT_ADDRESSES.PAN;
        const {
          tx: {
            from,
            to,
            data,
            value,
            // gasPrice,
            // gas
          },
        } = await request('https://api.1inch.exchange/v2.0/swap', {
          fromTokenAddress: fromAssetAddress,
          toTokenAddress: toAssetAddress,
          amount: fromAssetAmount.toString(),
          fromAddress: this.address,
          destReceiver: toAddress,
          slippage: SLIPPAGE,
        });
        tx = await this.ethersWallet.sendTransaction({
          from,
          to,
          data,
          value: this.bn(value),
          // gasPrice,
          // gas
        });
      }

      this.postMessageToIframe(sid, 'donate', {
        transactionHash: tx.hash,
      });
    } catch (err) {
      console.error(err);
      this.postMessageToIframe(sid, 'error', err);
    }
  }

  onComplete(sid, { transactionHash }) {
    if (this.options.onDonate) {
      this.options.onDonate(transactionHash);
    } else {
      this.close();
    }
  }
}

async function request(url, query) {
  if (query) {
    url += '?' + qs.stringify(query);
  }
  return await (await fetch(url)).json();
}
