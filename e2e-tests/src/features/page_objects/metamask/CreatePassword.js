import { BaseMetaMask } from './BaseMetaMask';
import { HtmlElement } from '../../framework/controls/HtmlElement';
import { TextBox } from '../../framework/controls/TextBox';

class CreatePassword extends BaseMetaMask {

  constructor() {
    super('/home.html#initialize/create-password/import-with-seed-phrase');
    this.walletSeed = () => new TextBox('textarea.first-time-flow__textarea');
    this.password = () => new TextBox('#password');
    this.confirmPassword = () => new TextBox('#confirm-password');
    this.terms = () => new HtmlElement('.first-time-flow__checkbox');
    this.import = () => new HtmlElement('.first-time-flow button');
  }

  enterWalletSeed(seed) {
    return this.walletSeed().type(seed);
  }

  enterPassword(password) {
    return this.password().type(password);
  }

  enterConfirmPassword(password) {
    return this.confirmPassword().type(password);
  }

  acceptTerms() {
    return this.terms().click();
  }

  clickImport() {
    return this.import().click();
  }

}

export { CreatePassword };
