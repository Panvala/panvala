import { BaseMetaMask } from './BaseMetaMask';
import { HtmlElement } from '../../framework/controls/HtmlElement';
import components from './components/index';

class Popup extends BaseMetaMask {

  constructor() {
    super('/popup.html');
    this.header = () => new components.Header();
    this.reject = () => new HtmlElement('.button.btn-default');
    this.accept = () => new HtmlElement('.button.btn-primary');
  }

  clickReject() {
    return this.accept().click();
  }

  clickAccept() {
    return this.accept().click();
  }

}

export { Popup };
