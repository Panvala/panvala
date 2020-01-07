import { When } from 'cucumber';
import panvala from '../../page_objects/panvala-web/index';
const team = new panvala.Team();

When(/^I enter the first name "(.*)" on the Panvala Team webpage$/, async (fullName) => {
  await team.enterFullName(fullName);
});

When(/^I enter the email "(.*)" on the Panvala Team webpage$/, async (email) => {
  await team.enterEmail(email);
});

When(/^I enter the message "(.*)" on the Panvala Team webpage$/, async (message) => {
  await team.enterMessage(message);
});

When(/^I click the Get in touch button on the Panvala Team webpage$/, async () => {
  await team.clickGetInTouch();
});
