import { HtmlElement } from '../../../framework/controls/HtmlElement'
import { TextBox } from '../../../framework/controls/TextBox'

class Header {

  constructor() {
    this.root = '.app-header'
    this.myAccount = () => new HtmlElement(`${this.root} .account-menu__icon`);
    this.networks = () => new HtmlElement(`${this.root} .network-name`);
    this.logOut = () => new HtmlElement('.account-menu__logout-button');
    this.networkName = () => new TextBox('#network-name');
    this.newRpcUrl = () => new TextBox('#rpc-url');
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

  clickMyAccount() {
    return this.myAccount().click();
  }

  async clickLogOut() {
    await this.clickMyAccount();
    return this.logOut().click();
  }

}

export { Header };
