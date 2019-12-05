import { HtmlElement } from './HtmlElement';

class Select extends HtmlElement {

  constructor(cssLocator) {
    super(cssLocator);
  }

  async select(item) {
    console.log(`Looking for '${item}' in '${this.cssLocator}'`);
    let desiredOption;
    const dropDown = await this.webElement;
    console.log(`Opening '${this.cssLocator}'`);
    await dropDown.click();
    await this.driver.sleep(1000);
    const options = await dropDown.findElements({ tagName: 'option' });
    for (let option of options) {
      const text = await option.getAttribute('label')
      if (text.includes(item)) {
        desiredOption = option;
        break;
      }
    }
    if (desiredOption) {
      console.log(`Clicking '${item}' in '${this.cssLocator}'`);
      await desiredOption.click();
      return this.driver.sleep(1000);
    } else {
      throw Error(`Could not find '${item}' in '${this.cssLocator}'`);
    }
  }
}

export { Select };
