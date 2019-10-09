import { When, Then } from 'cucumber';
import panvala from '../page_objects/panvala/index';
import { expect } from 'chai';
const slates = new panvala.Slates();

When(/^I navigate to the slates page$/, async () => {
    await slates.openPage();
});

When(/^I click add slates on the Panvala slates page$/, async () => {
    await slates.clickAddSlate();
});

When(/^I click the last grant slate card on the Panvala slates page$/, async () => {
    await slates.selectLastGrantSlate();
});

When(/^I click the last governance slate card on the Panvala slates page$/, async () => {
    await slates.selectLastGovernanceSlate();
});

Then(/^The deadline reads "(.*)" on the slates page$/, async (expectedText) => {
    const deadline = await slates.getDeadline();
    const end = deadline.length - 24;
    const actualText = deadline.substring(0, end);
    expect(actualText).to.equal(expectedText);
});
