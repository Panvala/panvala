import webdriver from'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';
let driver;

const getOptions = (browser, extension) => {
  const options = new chrome.Options();
  if (typeof extension !== 'undefined') {
    console.log('chrome.Options(): adding extension')
    const extensionPath = path.join(process.cwd(), 'lib', extension);
    console.log(`extension: ${extensionPath}`);
    options.addExtensions(extensionPath);
  }
  if (browser.toLowerCase().includes("remote")) {
    console.log('chrome.Options(): adding arguments')
    options.addArguments(`--no-sandbox`);
    options.addArguments(`--disable-dev-shm-usage`);
    options.addArguments(`--disable-gpu`);
  }
  return options;
};

const buildChromeDriver = async (browser, extension) => {
  const options = getOptions(browser, extension);
  return await new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
};

export const buildDriver = async (browser, extension) => {
  console.log(`browser: ${browser}`);
  switch (browser.toLowerCase()) {
  case 'chrome':
  case 'remote-chrome':
    driver = await buildChromeDriver(browser, extension);
    break;
  default:
    throw new Error(`Please specify a valid browser, unsuported browser '${browser}'`);
  }
};

export const getDriver = () => {
  return driver;
};
