import { BaseMetaMask } from './BaseMetaMask';
import { HtmlElement } from '../../framework/controls/HtmlElement';

class MetaMetrics extends BaseMetaMask {

  constructor() {
    super('/home.html#initialize/metametrics-opt-in');
    this.optInNoThanks = () => new HtmlElement('.metametrics-opt-in button');
  }

  clickNoThanks() {
    return this.optInNoThanks().click();
  }

}

export { MetaMetrics };
