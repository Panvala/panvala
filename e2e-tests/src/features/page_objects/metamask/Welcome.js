import { BaseMetaMask } from './BaseMetaMask';
import { HtmlElement } from '../../framework/controls/HtmlElement';

class Welcome extends BaseMetaMask {

  constructor() {
    super('/home.html#initialize/welcome');
    this.getStarted = () => new HtmlElement('.welcome-page button');
  }

  clickGetStarted() {
    return this.getStarted().click();
  }

}

export { Welcome };
