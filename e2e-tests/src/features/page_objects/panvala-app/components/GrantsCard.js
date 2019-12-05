import { HtmlElement } from '../../../framework/controls/HtmlElement';

class GrantsCards {

  constructor(row) {
    this._root = `.grant__FlexContainer-sc-1wx08qu-2 div.Box-os6zh6-0:nth-child(${row}) `;
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

};

export { GrantsCards };
