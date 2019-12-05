import { getDriver } from '../driver/driverFactory';
 
class BasePage {

  constructor(baseUrl, path) {
    this.baseUrl = baseUrl;
    this.path = path;
  }

  async openPage(id) {
    let url;
    url = this.baseUrl;
    if (typeof this.path !== 'undefined') {
      url = url + this.path;
    }
    if (typeof id !== 'undefined') {
      url = url + id;
    }
    console.log(`Navigating to '${url}'`);
    await getDriver().navigate().to(url);
  }

  async isDisplayed() {
    let expectedUrl = this.baseUrl;
    if (typeof this.path !== 'undefined') {
      expectedUrl = expectedUrl + this.path;
    }
    console.log(`expectedUrl: ${expectedUrl}`)
    return getDriver().wait(() => {
      return getDriver().getCurrentUrl()
      .then(async (url) => {
        console.log(`url: ${url}`)
        const result = url.includes(expectedUrl);
        if (!result) {
          await getDriver().sleep(1000);
        }
        return result;
      });
    }, 10000);
  }

  async isTextPresent(text) {
    console.log(`Checking if text ${text} is present on the page`);
    const pageBody = await getDriver().findElement({ css: 'body' }).getText();
    return pageBody.includes(text);
  }

  navigateTo(url) {
    console.log(`Navigating to '${url}'`);
    return getDriver().navigate().to(url);
  }

  async refresh() {
    const currentUrl = await getDriver().getCurrentUrl();
    console.log(`Refreshing the page ${currentUrl}`);
    return getDriver().navigate().refresh();
  }

  async resizeWindow(widthX, heightY) {
    console.log(`Resize window to ${widthX} x ${heightY}`);
    let {width, height} = await getDriver().manage().window().getSize();
    width += widthX;
    height += heightY;
    return getDriver().manage().window().setSize(width, height);
  }

  maximizeWindow() {
    console.log(`Maximize window`);
    return getDriver().manage().window().setSize(1280, 1000);
  }

  async switchToNewWindow(originalHandles) {
    console.log(`Waiting for new window, original window handles ${originalHandles}`);
    const forNewWindow = (originalHandles) => {
      return () => {
        return getDriver().getAllWindowHandles().then((currentHandles) => {
          return currentHandles.length > originalHandles.length;
        });
      };
    }
    await getDriver().wait(forNewWindow(originalHandles), 10000);
    console.log(`Retrieve new window handle`);
    const getNewWindowHandle = (originalHandles) => {
      return getDriver().getAllWindowHandles().then((currentHandles) => {
        return currentHandles.filter((handle) => {
          return originalHandles.indexOf(handle) < 0;
        })[0];
      });
    }
    const newHandle = await getNewWindowHandle(originalHandles);
    return this.switchToWindow(newHandle);
  }

  async switchToWindow(window) {
    console.log(`Switching to window '${window}'`);
    await getDriver().switchTo().window(window);
    return getDriver().sleep(1000);
  }

  async executeScript(script) {
    console.log(`Executing javascript ${script}`);
    return await getDriver().executeScript(script);
  }

  async addSessionStorageItem(key) {
    const script = `window.sessionStorage.setItem('${key}','TRUE');`
    return await this.executeScript(script);
  }

  async getSessionStorageItem(key) {
    const script = `return window.sessionStorage.getItem('${key}');`
    return await this.executeScript(script);
  }

}

export { BasePage };
