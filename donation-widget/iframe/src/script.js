import debug from './debug';
import * as qs from './qs';
import * as dom from './dom';

window.onload = () => new Donate();

class Donate {
  constructor() {
    this.handleMessage = e => this.handleMessageBound(e);
    this.handleMessages();

    this.addressLabel = document.getElementById('address');

    this.button = document.querySelector('button');

    this.amountInput = document.querySelector('input');
    this.amountInput.oninput = e => this.handleAmountChange(e);

    this.assetSelect = document.querySelector('select');
    this.assetSelect.onchange = e => this.handleAssetChange(e);

    this.form = document.querySelector('form');
    this.form.onsubmit = e => this.connectWalletOrApproveOrSwap(e);

    document.getElementById('close').onclick = () =>
      this.postMessageToParentWindow('cancel');

    this.loader = document.getElementById('boot-loader-container');
    dom.hide(this.loader);
    dom.show(this.form);

    const querystring = qs.parse(window.location.search.substring(1));
    this.props = JSON.parse(atob(unescape(querystring.options)));
    debug('props %o', this.props);
    this.amount = Number(this.props.defaultUSDAmount) || 100;
    this.form.amount.value = this.amount;
  }

  handleMessages() {
    if (window.addEventListener) {
      window.addEventListener('message', this.handleMessage, false);
    } else {
      window.attachEvent('onmessage', this.handleMessage);
    }
  }

  async handleMessageBound(evt) {
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

  handleAmountChange(e) {
    this.amount = e.target.value;
    this.updateButtonText();
  }

  handleAssetChange(e) {
    this.asset = e.target.value;
    this.updateButtonText();
  }

  updateButtonText() {
    if (this.address) {
      this.button.innerText = `Donate (${this.amount} ${this.asset}) →`;
    }
  }

  setIsSending(working = true) {
    this.working = working;
    dom.attr(this.amountInput, 'disabled', working);
    dom.attr(this.assetSelect, 'disabled', working);
    dom.attr(this.button, 'disabled', working);
    if (working) {
      this.button.innerText = 'Sending...';
    } else {
      this.updateButtonText();
    }
  }

  connectWalletOrApproveOrSwap(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!this.address) {
      debug('connecting wallet..');
      dom.show(this.loader);
      dom.hide(this.form);
      this.postMessageToParentWindow('connect-wallet');
    } else {
      debug('donating..');
      this.setIsSending();
      const { amount, asset } = this;
      const { to } = this.props;
      this.postMessageToParentWindow('send', { to, amount, asset });
    }
  }

  // events from iframe

  async onConnect({ address }) {
    dom.hide(this.loader);
    dom.show(this.form);

    this.address = address;
    debug('connected', address);
    dom.show(this.addressLabel, 1);
    this.addressLabel.querySelector('span').innerText = `${address.slice(
      0,
      6
    )}....${address.slice(-4)}`;
    this.updateButtonText();
  }

  async onSend(payload) {
    this.button.innerHTML =
      'Sent <span class="pl-2" style="font-family: none;">✓</span>';
    await sleep(3000);
    this.postMessageToParentWindow('complete', payload);
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
