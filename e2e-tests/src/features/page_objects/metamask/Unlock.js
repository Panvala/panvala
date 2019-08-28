import { BaseMetaMask } from './BaseMetaMask';
import { HtmlElement } from '../../framework/controls/HtmlElement';
import { TextBox } from '../../framework/controls/TextBox';

class Unlock extends BaseMetaMask {

  constructor() {
    super('/popup.html#unlock');
    this.passwordTextBox = () => new TextBox('#password');
    this.logInButton = () => new HtmlElement('.unlock-page button');
  }

  enterPassword(password) {
    return this.passwordTextBox().type(password);
  }

  clickLogIn() {
    return this.logInButton().click();
  }

}

export { Unlock };
