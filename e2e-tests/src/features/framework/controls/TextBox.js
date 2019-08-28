import { HtmlElement } from './HtmlElement';

class TextBox extends HtmlElement {

  constructor(cssLocator) {
    super(cssLocator);
  }

  async clear() {
    console.log(`Clearing text from '${this.cssLocator}'`);
    const result = await this.webElement.clear();
    return result;
  }

  async type(text) {
    console.log(`Typing '${text}' into '${this.cssLocator}'`);
    await this.webElement.sendKeys(text);
  }
}

export { TextBox };
