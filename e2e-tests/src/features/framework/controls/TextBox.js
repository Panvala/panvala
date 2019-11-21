import { HtmlElement } from './HtmlElement';
import { Key } from 'selenium-webdriver';

class TextBox extends HtmlElement {

  constructor(cssLocator) {
    super(cssLocator);
  }

  async clear() {
    console.log(`Clearing text from '${this.cssLocator}'`);
    await this.webElement.clear();
    await this.driver.sleep(1000);
    const text = await this.webElement.getAttribute('value');
    if (text) {
      await this.webElement.sendKeys('');
      for (let i = 0; i < text.length; i++) {
        await this.webElement.sendKeys(Key.BACK_SPACE);
      }
      await this.driver.sleep(1000);
    }
  }

  focus() {
    console.log(`Focusing in '${this.cssLocator}'`);
    return this.webElement.sendKeys('');
  }

  async getText() {
    console.log(`Retrieving the value from '${this.cssLocator}'`);
    return await this.webElement.getAttribute('value');
  }

  async type(text) {
    console.log(`Typing '${text}' into '${this.cssLocator}'`);
    await this.webElement.sendKeys(text);
    return await this.driver.sleep(1000);
  }
}

export { TextBox };
