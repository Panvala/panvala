import webdriver from'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
let driver;

const buildChromeDriver = async (seleniumProfile) => {
  const options = new chrome.Options();
  options.addArguments(`user-data-dir=${seleniumProfile.profile}`);
  options.addArguments(`profile-directory=${seleniumProfile.profileDir}`);
  return await new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
};

export const buildDriver = async (profile) => {
  console.log(`buildDriver ${JSON.stringify(profile)}`);
  switch (profile.browser.toLowerCase()) {
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
