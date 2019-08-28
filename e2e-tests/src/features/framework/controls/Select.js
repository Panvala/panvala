import { HtmlElement } from './HtmlElement';

class Select extends HtmlElement {

  constructor(cssLocator) {
    super(cssLocator);
  }

  async select(item) {
    console.log(`Looking for '${item}' in '${this.cssLocator}'`);
  }
}

export { Select };
