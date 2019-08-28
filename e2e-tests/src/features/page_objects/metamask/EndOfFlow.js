import { BaseMetaMask } from './BaseMetaMask';
import { HtmlElement } from '../../framework/controls/HtmlElement';

class EndOfFlow extends BaseMetaMask {

  constructor() {
    super('/home.html#initialize/end-of-flow');
    this.allDone = () => new HtmlElement('.end-of-flow button');
  }

  clickAllDone() {
    return this.allDone().click();
  }

}

export { EndOfFlow };
