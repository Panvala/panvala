import webdriver from'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';
let driver;

const getOptions = (seleniumProfile) => {
  const options = new chrome.Options();
  if (typeof seleniumProfile.extension !== 'undefined') {
    console.log('chrome.Options(): adding extension')
    const extension = path.join(process.cwd(), 'lib', seleniumProfile.extension);
    console.log(`extension: ${extension}`);
    options.addExtensions(extension);
  }
  if (seleniumProfile.browser.toLowerCase().includes("remote")) {
    console.log('chrome.Options(): adding arguments')
    options.addArguments(`--no-sandbox`);
    options.addArguments(`--disable-dev-shm-usage`);
    options.addArguments(`--disable-gpu`);
  }
  return options;
};

const buildChromeDriver = async (seleniumProfile) => {
  const options = getOptions(seleniumProfile);
  return await new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
};

export const buildDriver = async (profile) => {
  console.log(`browser: ${JSON.stringify(profile)}`);
  switch (profile.browser.toLowerCase()) {
  case 'chrome':
  case 'remote-chrome':
    driver = await buildChromeDriver(profile);
    break;
  default:
    throw new Error(`Please specify a valid browser, unsuported browser '${profile.browser}'`);
  }
};

export const getDriver = () => {
  return driver;
};
