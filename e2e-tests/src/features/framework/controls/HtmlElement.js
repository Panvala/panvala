import { getDriver } from '../driver/driverFactory';
import error from 'selenium-webdriver/lib/error';

class HtmlElement {

  constructor(cssLocator) {
    this.driver = getDriver();
    this.webElement = this.driver.findElement({ css: cssLocator });
    this.cssLocator = cssLocator;
  }

  async click() {
    console.log(`Clicking '${this.cssLocator}'`);
    await this.webElement.click();
    await this.driver.sleep(1000);
  }

  async getText() {
    console.log(`Retrieving the value from '${this.cssLocator}'`);
    const result = await this.webElement.getText();
    return result;
  }

  async isDisplayed() {
    console.log(`Checking if ${this.cssLocator} is displayed`);
    try {
      const result = await this.webElement.isDisplayed();
      return result;
    } catch (e) {
      if (e instanceof error.NoSuchElementError) {
        return false;
      } else {
        throw new Error(e);
      }
    }
  }

  async moveTo() {
    console.log(`Moving to '${this.cssLocator}'`);
    await this.driver.actions()
    .move({origin: this.webElement})
    .perform();
    await this.driver.sleep(1000);
  }
}

export { HtmlElement };
