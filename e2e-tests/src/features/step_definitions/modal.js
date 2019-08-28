import { Then, When } from 'cucumber';
import { expect } from 'chai';
import components from '../page_objects/panvala/components/index'
const modal = new components.Modal();

Then(/^The "(.*)" modal dialog is displayed reading$/, async (expectedTitle, expectedDesc) => {
    const actualTitle = await modal.getTitle();
    const actualDesc = await modal.getDescription();
    const modalIsDisplayed = await modal.isDisplayed();
    expect(modalIsDisplayed).to.equal(true);
    expect(actualTitle).to.equal(expectedTitle);
    expect(actualDesc).to.equal(expectedDesc);
});

Then(/^The modal dialog is not displayed$/, async () => {
    const modalIsDisplayed = await modal.isDisplayed();
    expect(modalIsDisplayed).to.equal(false);
});

When(/^I accept the modal dialog$/, async () => {
    await modal.clickDone();
});
