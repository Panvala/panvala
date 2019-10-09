import { When } from 'cucumber';
import panvala from '../page_objects/panvala/index';
import metamask from '../page_objects/metamask/index';
const popup = new metamask.Popup();
const createGovernance = new panvala.CreateGovernance();

When(/^I enter the slate details on the Panvala Create a Governance Slate page$/, async () => {
    const uniqueId = new Date().valueOf();
    await createGovernance.enterEmail(`peter.yinusa+${uniqueId}@gmail.com`);
    await createGovernance.enterFirstName(`Peter${uniqueId}`);
    await createGovernance.enterLastName(`Yinusa${uniqueId}`);
    await createGovernance.enterOrganizationName(`Panvala ${uniqueId} Ltd`);
    await createGovernance.enterDescription(`Description ${uniqueId}`);
    await createGovernance.clickRecommendNoAction();
    await createGovernance.clickNo();
});

When(/^I enter the email "(.*)" on the Panvala Create Governance Slate page$/, async function(email) {
    this.setSlate({email: email});
    await createGovernance.enterEmail(email);
});
  
When(/^I enter the first name "(.*)" on the Panvala Create Governance Slate page$/, async function(firstname) {
    this.setSlate({firstname: firstname});
    await createGovernance.enterFirstName(firstname);
});

When(/^I enter the description "(.*)" on the Panvala Create Governance Slate page$/, async function(description) {
    this.setSlate({description: description});
    await createGovernance.enterDescription(description);
});

When(/^I click the Recommend no action option on the Panvala Create Governance Slate page$/, async () => {
    await createGovernance.clickRecommendNoAction();
});

When(/^I click the Stake no option on the Panvala Create Governance Slate page$/, async () => {
    await createGovernance.clickNo();
});

When(/^I click the Create Slate button on the Panvala Create Governance Slate page$/, async () => {
    const openWallet = async () => {
        await createGovernance.clickCreateSlate();
    };
    const acceptTransaction = async () => {
        await popup.clickAccept();
    };
    await popup.doStuffInWalletPopup(openWallet, acceptTransaction);
});