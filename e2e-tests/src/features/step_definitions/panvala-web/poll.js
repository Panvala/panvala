import { When } from 'cucumber';
import panvala from '../../page_objects/panvala-web/index';
const poll = new panvala.Poll();
import metamask from '../../page_objects/metamask/index';
const popup = new metamask.Popup();

When(/^I click the View Poll button on the Panvala Poll webpage$/, async () => {
  await poll.clickViewPoll()
});

When(/^I enter the percentage points "(.*)" for category one on the Panvala Poll webpage$/, async (points) => {
  await poll.enterCategoryOne(points);
});

When(/^I enter the percentage points "(.*)" for category two on the Panvala Poll webpage$/, async (points) => {
  await poll.enterCategoryTwo(points);
});

When(/^I enter the percentage points "(.*)" for category three on the Panvala Poll webpage$/, async (points) => {
  await poll.enterCategoryThree(points);
});

When(/^I enter the percentage points "(.*)" for category four on the Panvala Poll webpage$/, async (points) => {
  await poll.enterCategoryFour(points);
});

When(/^I enter the percentage points "(.*)" for category five on the Panvala Poll webpage$/, async (points) => {
  await poll.enterCategoryFive(points);
});

When(/^I enter the percentage points "(.*)" for category six on the Panvala Poll webpage$/, async (points) => {
  await poll.enterCategorySix(points);
});

When(/^I enter the first name "(.*)" on the Panvala Poll webpage$/, async (firstname) => {
  await poll.enterFirstName(firstname);
});

When(/^I enter the last name "(.*)" on the Panvala Poll webpage$/, async (lastname) => {
  await poll.enterLastName(lastname);
});

When(/^I enter the email "(.*)" on the Panvala Poll webpage$/, async (email) => {
  await poll.enterEmail(email);
});

When(/^I click the Submit Vote button on the Panvala Poll webpage$/, {timeout: 45 * 1000}, async () => {
  const openWallet = async () => {
    await poll.clickSubmitVote()
  };
  const acceptTransaction = async () => {
      await popup.clickAccept();
  };
  const doNothing = async () => {
    console.log('do nothing');
  };
  await popup.doStuffInWalletPopup(openWallet, acceptTransaction);
  await popup.doStuffInWalletPopup(doNothing, acceptTransaction);
});
