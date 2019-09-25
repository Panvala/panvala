import { getDriver } from '../driver/driverFactory';

class HtmlElementCollection {

  constructor(cssLocator) {
    this.driver = getDriver();
    this.webElements = this.driver.findElements({ css: cssLocator });
    this.cssLocator = cssLocator;
  }

  async click(number) {
    number = typeof number !== 'undefined' ? number : 1;
    console.log(`Clicking the '${number}' occurrence of '${this.cssLocator}'`);
    const elements = await this.webElements;
    await elements[number].click();
    await this.driver.sleep(1000);
  }

  async count() {
    console.log(`Retrieving the count of elements '${this.cssLocator}'`);
    const elements = await this.webElements;
    return elements.length;
  }

  async getText(number) {
    number = typeof number !== 'undefined' ? number : 1;
    console.log(`Retrieving the value from the '${number}' occurrence of '${this.cssLocator}'`);
    const elements = await this.webElements;
    return await elements[number].getText();
  }

}

export { HtmlElementCollection };
