import _debounce from 'lodash/debounce';
import _camelCase from 'lodash/camelCase';
import _bindAll from 'lodash/bindAll';
import debug from './debug';
import * as qs from './qs';
import * as dom from './dom';

window.onload = () => new Donate();

class Donate {
  constructor() {
    _bindAll(this, 'handleMessage');
    this.getQuote = _debounce(this.getQuoteDebounced.bind(this), 100);

    const querystring = qs.parse(window.location.search.substring(1));
    this.props = JSON.parse(atob(unescape(querystring.options)));
    debug('props %o', this.props);

    this.addressLabel = document.getElementById('address');
    this.fromAssetAmountLabel = document.getElementById('from-asset-amount');
    this.fromAssetBalanceContainer = document.getElementById(
      'from-asset-balance-container'
    );
    this.fromAssetBalanceLabel = this.fromAssetBalanceContainer.querySelector(
      'span'
    );
    this.toPanAmountLabel = document.getElementById('to-pan-amount');
    this.toPanAmountLabelContainer = document.getElementById(
      'to-pan-amount-container'
    );
    this.button = document.querySelector('button');
    this.usdInput = document.querySelector('input');
    this.fromAssetSelect = document.querySelector('select');
    this.form = document.querySelector('form');
    this.close = document.getElementById('close');
    this.loader = document.getElementById('boot-loader-container');

    this.setUpEventHandlers();
    this.load();
  }

  setUpEventHandlers() {
    this.handleMessages();

    this.usdInput.oninput = this.getQuote;
    this.fromAssetSelect.onchange = this.getQuote;
    this.form.onsubmit = e => this.connectWalletOrApproveOrDonate(e);
    this.close.onclick = () => this.postMessageToParentWindow('cancel');
  }

  handleMessages() {
    if (window.addEventListener) {
      window.addEventListener('message', this.handleMessage, false);
    } else {
      window.attachEvent('onmessage', this.handleMessage);
    }
  }

  async handleMessage(evt) {
    let msg;
    try {
      msg = JSON.parse(evt.data);
    } catch {
      return;
    }
    debug('msg: %s', msg.sid);
    if (parseInt(msg.sid) !== parseInt(this.props.sid)) {
      return debug('ignoring msg(%s) self(%s)', msg.sid, this.props.sid);
    }
    debug('msg %o', msg);
    const meth = _camelCase('on-' + msg.type);
    if (!this[meth]) return debug('unknown msg type %s', meth);
    this[meth](msg.payload);
  }

  postMessageToParentWindow(type, payload = {}) {
    window.top.postMessage(
      JSON.stringify({ type, payload, sid: this.props.sid }),
      this.props.host
    );
  }

  load() {
    this.postMessageToParentWindow('iframe-load', this.props);
  }

  setIsWorking(text) {
    const working = !!text;
    dom.attr(this.usdInput, 'disabled', working);
    dom.attr(this.fromAssetSelect, 'disabled', working);
    dom.attr(this.button, 'disabled', working);
    if (working) {
      this.setButtonText(text);
    }
  }

  connectWalletOrApproveOrDonate(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.address) {
      debug('connecting wallet..');
      dom.show(this.loader);
      dom.hide(this.form);
      this.postMessageToParentWindow('connect-wallet');
    } else if (this.approve) {
      debug('approving..');
      this.setIsWorking('Approving..');
      this.postMessageToParentWindow('approve', {
        fromAsset: this.fromAssetSelect.value,
        fromAssetAmount: this.fromAssetAmount,
      });
    } else {
      debug('donating..');
      this.setIsWorking('Donating..');
      this.postMessageToParentWindow('donate', {
        fromAsset: this.fromAssetSelect.value,
        fromAssetAmount: this.fromAssetAmount,
        toPanAmount: this.toPanAmount,
        toAddress: this.props.to,
      });
    }
  }

  setButtonText(text) {
    this.button.innerHTML = text;
  }

  getQuoteDebounced() {
    const fromAsset = this.fromAssetSelect.value;
    const usd = parseFloat(this.usdInput.value);
    if (!usd) {
      this.toPanAmountLabel.innerText = '0';
      this.fromAssetAmountLabel.innerText = '0';
      return;
    }

    this.postMessageToParentWindow('get-quote', {
      fromAsset,
      usd,
    });
  }

  // events from iframe

  onError(err) {
    debug('received error: %s', err.message); // todo display error to user
    this.setIsWorking(false);
    this.getQuote();
  }

  onConnect({ address }) {
    dom.hide(this.loader);
    dom.show(this.form);

    this.address = address;
    debug('connected', address);
    dom.show(this.addressLabel, 1);
    this.addressLabel.querySelector('span').innerText = `${address.slice(
      0,
      6
    )}....${address.slice(-4)}`;
    dom.show(this.fromAssetBalanceContainer);
    this.getQuote();
  }

  onIframeLoad({}) {
    this.usdInput.value = this.props.defaultUSDAmount;

    dom.hide(this.loader);
    dom.show(this.form);

    this.getQuote();
  }

  onGetQuote({
    fromAssetAmount,
    toPanAmount,
    fromAssetBalance,
    approve,
    hasSufficientBalance,
  }) {
    this.fromAssetAmount = fromAssetAmount;
    this.toPanAmount = toPanAmount;

    const fromPAN = this.fromAssetSelect.value === 'PAN';
    // dom.toggle(this.toPanAmountLabelContainer, !fromPAN);
    if (fromPAN) {
      fromAssetAmount = toPanAmount;
    }
    // if (!fromPAN) {
    this.fromAssetAmountLabel.innerText = fromAssetAmount;
    // }
    this.toPanAmountLabel.innerText = toPanAmount;

    if (this.address && fromAssetBalance) {
      this.fromAssetBalanceLabel.innerText = fromAssetBalance;
    }

    this.approve = approve;
    dom.attr(this.button, 'disabled', this.address && !hasSufficientBalance);

    if (!this.address) {
      this.setButtonText('Connect Wallet');
    } else if (!hasSufficientBalance) {
      this.setButtonText('Insufficent Balance');
    } else if (approve) {
      this.setButtonText(`Approve ${this.fromAssetSelect.value}`);
    } else if (this.address) {
      this.setButtonText('Donate →');
    }
  }

  async onApprove() {
    this.setIsWorking(false);
    this.getQuote();
  }

  async onDonate(props) {
    this.setIsWorking(false);
    this.setButtonText(
      'Donated <span class="pl-2" style="font-family: none;">✓</span>'
    );
    await sleep(3000);
    this.postMessageToParentWindow('complete', props);
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
