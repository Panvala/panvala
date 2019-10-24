import webdriver from'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
let driver;

const buildLocalChromeDriver = async (seleniumProfile) => {
  const options = new chrome.Options();
  options.addArguments(`user-data-dir=${seleniumProfile.profile}`);
  options.addArguments(`profile-directory=${seleniumProfile.profileDir}`);
  return await new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
};

const buildChromeDriver = async (seleniumProfile) => {
  const options = new chrome.Options();
  const crxStream = require('fs').readFileSync(seleniumProfile.extension);
  const crxBuffer = Buffer.from(crxStream).toString('base64');
  options.addExtensions(crxBuffer);
  return await new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
};

export const buildDriver = async (profile) => {
  console.log(`browser: ${JSON.stringify(profile)}`);
  switch (profile.browser.toLowerCase()) {
  case 'local-chrome':
    driver = await buildLocalChromeDriver(profile);
    break;
  case 'chrome':
    driver = await buildChromeDriver(profile);
    break;
  default:
    throw new Error(`Please specify a valid browser, unsuported browser '${profile.browser}'`);
  }
};

export const getDriver = () => {
  return driver;
};
