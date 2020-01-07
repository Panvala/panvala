import { When } from 'cucumber';
import panvala from '../../page_objects/panvala-web/index';
const donate = new panvala.Donate();
import metamask from '../../page_objects/metamask/index';
const popup = new metamask.Popup();

When(/^I click the Donate Now button on the Panvala Donate webpage$/, async () => {
  await donate.clickDonateNow();
});

When(/^I enter the first name "(.*)" on the Panvala Donate webpage$/, async (firstname) => {
  await donate.enterFirstName(firstname);
});

When(/^I enter the last name "(.*)" on the Panvala Donate webpage$/, async (lastname) => {
  await donate.enterLastName(lastname);
});

When(/^I enter the email "(.*)" on the Panvala Donate webpage$/, async function(email) {
  this.setAutoPilotContact({email: email});
  await donate.enterEmail(email);
});

When(/^I select the tier "(.*)" on the Panvala Donate webpage$/, async (tier) => {
  await donate.selectTier(tier);
});

When(/^I select the duration "(.*)" on the Panvala Donate webpage$/, async (duration) => {
  await donate.selectDuration(duration);
});

When(/^I click the Donate button on the Panvala Donate webpage$/, {timeout: 45 * 1000}, async () => {
  const openWallet = async () => {
    await donate.clickDonate();
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
