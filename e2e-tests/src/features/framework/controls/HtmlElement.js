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
    return this.driver.sleep(1000);
  }

  async getText() {
    console.log(`Retrieving the value from '${this.cssLocator}'`);
    return await this.webElement.getText();
  }

  async isDisplayed() {
    console.log(`Checking if ${this.cssLocator} is displayed`);
    try {
      return await this.webElement.isDisplayed();
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
    return this.driver.sleep(1000);
  }

  async waitForTextToAppear(text) {
    console.log(`Waiting for the text '${text}' to appear in '${this.cssLocator}'`);
    return this.driver.wait(async () => {
      const actualText = await this.driver.findElement({ css: this.cssLocator }).getText();
      const result = actualText.toLowerCase().includes(text.toLowerCase());
      if (!result) {
        await getDriver().sleep(1000);
      }
      return result;
    }, 10000);
  }

  async waitForTextToDisappear(text) {
    console.log(`Waiting for the text '${text}' to disappear in '${this.cssLocator}'`);
    return this.driver.wait(async () => {
      const actualText = await this.driver.findElement({ css: this.cssLocator }).getText();
      const result = !actualText.toLowerCase().includes(text.toLowerCase());
      if (!result) {
        await getDriver().sleep(1000);
      }
      return result;
    }, 10000);
  }
}

export { HtmlElement };
