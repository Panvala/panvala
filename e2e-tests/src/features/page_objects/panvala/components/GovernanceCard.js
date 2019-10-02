import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { HtmlElementCollection } from '../../../framework/controls/HtmlElementCollection';

class GovernanceCard {

  constructor(row) {
    this._root = `a:nth-of-type(${row}) div.Box-os6zh6-0 `;
    this.cards = () => new HtmlElementCollection('a div.Card__CardBody-h3ymxi-0');
    this.card = () => new HtmlElement(this._root + '.Card__CardBody-h3ymxi-0');
    this.title = () => new HtmlElement(this._root + '.Card__CardTitle-h3ymxi-1');
    this.subTitle = () => new HtmlElement(this._root + '.Card__CardSubTitle-h3ymxi-2');
    this.description = () => new HtmlElement(this._root + '.Card__CardDescription-h3ymxi-3');
  }

  clickCard() {
    return this.card().click();
  }

  getTitle() {
    return this.title().getText();
  }

  getSubTitle() {
    return this.subTitle().getText();
  }

  getDescription() {
    return this.description().getText();
  }

  async getCardsCount() {
    return await this.cards().count();
  }

};

export { GovernanceCard };
