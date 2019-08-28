import webdriver from'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';
import { METAMASK_CRX } from '../../config/envConfig';
import 'chromedriver';
let driver;

const buildChromeDriver = async () => {
  const options = new chrome.Options();
  const crxStream = require('fs').readFileSync(path.join(__dirname, `../../../../${METAMASK_CRX}`));
  const crxBuffer = Buffer.from(crxStream).toString('base64');
  options.addExtensions(crxBuffer);
  return await new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
};

export const buildDriver = async (browser) => {
  console.log(`buildDriver ${browser}`);
  switch (browser.toLowerCase()) {
  case 'chrome':
    driver = await buildChromeDriver();
    break;
  default:
    throw new Error(`Please specify a valid browser, unsuported browser '${browser}'`);
  }
};

export const getDriver = () => {
  return driver;
};
