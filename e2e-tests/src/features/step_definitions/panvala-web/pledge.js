import { When } from 'cucumber';
import panvala from '../../page_objects/panvala-web/index';
const pledge = new panvala.Pledge();

When(/^I click the Pledge Now button on the Panvala Pledge webpage$/, async () => {
  await pledge.clickPledgeNow();
});

When(/^I enter the first name "(.*)" on the Panvala Pledge webpage$/, async (firstname) => {
  await pledge.enterFirstName(firstname);
});

When(/^I enter the last name "(.*)" on the Panvala Pledge webpage$/, async (lastname) => {
  await pledge.enterLastName(lastname);
});

When(/^I enter the email "(.*)" on the Panvala Pledge webpage$/, async (email) => {
  await pledge.enterEmail(email);
});

When(/^I select the tier "(.*)" on the Panvala Pledge webpage$/, async (tier) => {
  await pledge.selectTier(tier);
});

When(/^I click the Pledge button on the Panvala Pledge webpage$/, async () => {
  await pledge.clickPledge();
});
