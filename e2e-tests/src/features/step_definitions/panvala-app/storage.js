import { When, Then } from 'cucumber';
import { expect } from 'chai';
import panvala from '../../page_objects/panvala-app/index';
const page = new panvala.BasePanvalaApp();

When(/^I have the "(.*)" session storage item$/, async (key) => {
  await page.addSessionStorageItem(key);
  await page.refresh();
});

Then(/^The session storage item "(.*)" does not exist$/, async (key) => {
  const item = await page.getSessionStorageItem(key);
  expect(item).to.be.null;
});

Then(/^The session storage item "(.*)" exists$/, async (key) => {
  await page.refresh();
  const item = await page.getSessionStorageItem(key);
  expect(item).to.not.be.null;
});
