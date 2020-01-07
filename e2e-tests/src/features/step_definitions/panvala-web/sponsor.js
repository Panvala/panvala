import { When } from 'cucumber';
import panvala from '../../page_objects/panvala-web/index';
const sponsor = new panvala.Sponsor();
import metamask from '../../page_objects/metamask/index';
const popup = new metamask.Popup();

When(/^I click the Sponsor Now button on the Panvala Sponsor webpage$/, async () => {
  await sponsor.clickSponsorNow();
});

When(/^I enter the company "(.*)" on the Panvala Sponsor webpage$/, async (company) => {
  await sponsor.enterCompany(company);
});

When(/^I enter the first name "(.*)" on the Panvala Sponsor webpage$/, async (firstname) => {
  await sponsor.enterFirstName(firstname);
});

When(/^I enter the last name "(.*)" on the Panvala Sponsor webpage$/, async (lastname) => {
  await sponsor.enterLastName(lastname);
});

When(/^I enter the email "(.*)" on the Panvala Sponsor webpage$/, async function(email) {
  this.setAutoPilotContact({email: email});
  await sponsor.enterEmail(email);
});

When(/^I enter the amount "(.*)" on the Panvala Sponsor webpage$/, async (amount) => {
  await sponsor.enterAmount(amount);
});

When(/^I select the duration "(.*)" on the Panvala Sponsor webpage$/, async (duration) => {
  await sponsor.selectDuration(duration);
});

When(/^I click the Donate button on the Panvala Sponsor webpage$/, {timeout: 45 * 1000}, async () => {
  const openWallet = async () => {
    await sponsor.clickDonate();
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
