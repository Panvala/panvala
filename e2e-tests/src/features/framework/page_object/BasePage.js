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

  async navigateTo(url) {
    console.log(`Navigating to '${url}'`);
    await getDriver().navigate().to(url);
  }

  async refresh() {
    const currentUrl = await getDriver().getCurrentUrl();
    console.log(`Refreshing the page ${currentUrl}`);
    await getDriver().navigate().refresh();
  }

  async resizeWindow(widthX, heightY) {
    console.log(`Resize window to ${widthX} x ${heightY}`);
    let {width, height} = await getDriver().manage().window().getRect();
    width += widthX;
    height += heightY;
    await getDriver().manage().window().setRect({width, height});
  }

  async maximizeWindow() {
    console.log(`Maximize window`);
    await getDriver().manage().window().maximize();
  }

  async switchToNewWindow(originalHandles, expectedHandlesCount) {
    if (!originalHandles) {
      originalHandles = await getDriver().getAllWindowHandles();
    }
    if (originalHandles.length === expectedHandlesCount) {
      console.log(`New Window already open, do nothing`);  
      return;
    }
    console.log(`Waiting for new window, original window handles ${originalHandles}`);
    const forNewWindow = (originalHandles) => {
      return () => {
        return getDriver().getAllWindowHandles().then((currentHandles) => {
          return currentHandles.length > originalHandles.length;
        });
      };
    }
    await getDriver().wait(forNewWindow(originalHandles), 5000);
    console.log(`Retrieve new window handle`);
    const getNewWindowHandle = (originalHandles) => {
      return getDriver().getAllWindowHandles().then((currentHandles) => {
        return currentHandles.filter((handle) => {
          return originalHandles.indexOf(handle) < 0;
        })[0];
      });
    }
    const newHandle = await getNewWindowHandle(originalHandles);
    await this.switchToWindow(newHandle);
  }

  async switchToWindow(window) {
    console.log(`Switching to window '${window}'`);
    await getDriver().switchTo().window(window);
  }

  async executeScript(script) {
    console.log(`Executing javascript ${script}`);
    const value = await getDriver().executeScript(script);
    return value;
  }

  async addSessionStorageItem(key) {
    const script = `window.sessionStorage.setItem('${key}','TRUE');`
    await this.executeScript(script);
  }

  async getSessionStorageItem(key) {
    const script = `return window.sessionStorage.getItem('${key}');`
    const item = await this.executeScript(script);
    return item;
  }

}

export { BasePage };
