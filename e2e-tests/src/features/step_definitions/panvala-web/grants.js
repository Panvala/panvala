import { When } from 'cucumber';
import panvala from '../../page_objects/panvala-web/index';
const grants = new panvala.Grants();

When(/^I click the Apply for a grant button on the Panvala Grants webpage$/, async () => {
  await grants.clickApplyForGrant()
});

When(/^I enter the full name "(.*)" on the Panvala Grants webpage$/, async (fullName) => {
  await grants.enterFullName(fullName);
});

When(/^I enter the email "(.*)" on the Panvala Grants webpage$/, async function(email) {
  this.setAutoPilotContact({email: email});
  await grants.enterEmail(email);
});

When(/^I click the Get in touch button on the Panvala Grants webpage$/, async () => {
  await grants.clickGetInTouch();
});
