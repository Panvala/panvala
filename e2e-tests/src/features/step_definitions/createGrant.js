import { When } from 'cucumber';
import panvala from '../page_objects/panvala/index';
import metamask from '../page_objects/metamask/index';
const popup = new metamask.Popup();
const createGrant = new panvala.CreateGrant();

When(/^I enter the slate details on the Panvala Create a Grant Slate page$/, async () => {
    const uniqueId = new Date().valueOf();
    await createGrant.enterEmail(`peter.yinusa+${uniqueId}@gmail.com`);
    await createGrant.enterFirstName(`Peter${uniqueId}`);
    await createGrant.enterLastName(`Yinusa${uniqueId}`);
    await createGrant.enterOrganizationName(`Panvala ${uniqueId} Ltd`);
    await createGrant.enterDescription(`Description ${uniqueId}`);
    await createGrant.clickRecommendNoAction();
    await createGrant.clickNo();
});

When(/^I enter the email "(.*)" on the Panvala Create Grant Slate page$/, async function(email) {
    this.setSlate({email: email});
    await createGrant.enterEmail(email);
});
  
When(/^I enter the first name "(.*)" on the Panvala Create Grant Slate page$/, async function(firstname) {
    this.setSlate({firstname: firstname});
    await createGrant.enterFirstName(firstname);
});

When(/^I enter the description "(.*)" on the Panvala Create Grant Slate page$/, async function(description) {
    this.setSlate({description: description});
    await createGrant.enterDescription(description);
});

When(/^I click the Recommend no action option on the Panvala Create Grant Slate page$/, async () => {
    await createGrant.clickRecommendNoAction();
});

When(/^I click the Stake no option on the Panvala Create Grant Slate page$/, async () => {
    await createGrant.clickNo();
});

When(/^I click the Create Slate button on the Panvala Create Grant Slate page$/, async () => {
    const openWallet = async () => {
        await createGrant.clickCreateSlate();
    };
    const acceptTransaction = async () => {
        await popup.clickAccept();
    };
    await popup.doStuffInWalletPopup(openWallet, acceptTransaction);
});
