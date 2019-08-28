import { BaseMetaMask } from './BaseMetaMask';
import { HtmlElement } from '../../framework/controls/HtmlElement';
import { TextBox } from '../../framework/controls/TextBox';

class Popup extends BaseMetaMask {

  constructor() {
    super('/popup.html');
    this.networks = () => new HtmlElement('.network-name');
    this.networkName = () => new TextBox('#network-name');
    this.newRpcUrl = () => new TextBox('#rpc-url');
    this.reject = () => new HtmlElement('.button.btn-default');
    this.accept = () => new HtmlElement('.button.btn-primary');
  }

  async selectNetwork(number) {
    await this.networks().click();
    return new HtmlElement(`.menu-droppo li:nth-of-type(${number})`).click();
  }

  async selectCustomNetwork(networkName, newRpcUrl) {
    await this.networks().click();
    await new HtmlElement(`.menu-droppo li:nth-of-type(7)`).click();
    await this.networkName().type(networkName);
    await this.newRpcUrl().type(newRpcUrl);
    await new HtmlElement(`.button.btn-secondary:nth-child(2)`).moveTo();
    return new HtmlElement(`.button.btn-secondary:nth-child(2)`).click();
  }

  clickReject() {
    return this.accept().click();
  }

  clickAccept() {
    return this.accept().click();
  }

}

export { Popup };
