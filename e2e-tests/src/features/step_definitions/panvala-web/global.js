import { When, Then } from 'cucumber';
import panvala from '../../page_objects/panvala-web/index';
import { expect } from 'chai';
const donate = new panvala.Donate();
const pagesMap = {
  Donate: donate
};

When(/^I navigate to the "(.*)" webpage$/, async (pageName) => {
  const name = pageName.replace(/\s/g, '');
  const page = pagesMap[name];
  await page.openPage();
});

Then(/^The Panvala "(.*)" webpage is displayed$/, {timeout: 15 * 1000}, async (pageName) => {
  const name = pageName.replace(/\s/g, '');
  const page = pagesMap[name];
  const result = await page.isDisplayed();
  expect(result).to.equal(true);
});

Then(/^The follwing text is displayed on the webpage$/, async (text) => {
  const result = await new panvala.BasePanvalaWeb().isTextPresent(text);
  expect(result).to.equal(true);
});