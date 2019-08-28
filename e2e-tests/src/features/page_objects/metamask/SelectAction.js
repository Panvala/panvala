import { BaseMetaMask } from './BaseMetaMask';
import { HtmlElement } from '../../framework/controls/HtmlElement';

class SelectAction extends BaseMetaMask {

  constructor() {
    super('/home.html#initialize/select-action');
    this.importWallet = () => new HtmlElement('.first-time-flow button');
  }

  clickImportWallet() {
    return this.importWallet().click();
  }

}

export { SelectAction };
