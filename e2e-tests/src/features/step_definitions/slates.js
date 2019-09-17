import { When } from 'cucumber';
import panvala from '../page_objects/panvala/index';
import metamask from '../page_objects/metamask/index';
const popup = new metamask.Popup();
const slates = new panvala.Slates();
const createSlates = new panvala.CreateSlates();
const createGrant = new panvala.CreateGrant();
const createGovernance = new panvala.CreateGovernance();

When(/^I navigate to the slates page$/, async () => {
    await slates.openPage();
});

When(/^I click add slates on the Panvala slates page$/, async () => {
    await slates.clickAddSlate();
});

When(/^I select the (.*) slate type on the Panvala Create a Slate page$/, async (slateType) => {
    await createSlates.selectSlateType(slateType);
    await createSlates.clickBegin();
});

When(/^I enter the slate details on the Panvala Create a Grant Slate page$/, async () => {
    const uniqueId = new Date().valueOf();
    await createGrant.enterEmail(`peter.yinusa+${uniqueId}@gmail.com`);
    await createGrant.enterFirstName(`Peter${uniqueId}`);
    await createGrant.enterLastName(`Yinusa${uniqueId}`);
    await createGrant.enterOrganizationName(`Panvala ${uniqueId} Ltd`);
    await createGrant.enterDescription(`Description ${uniqueId}`);
    await createGrant.clickRecommendNoAction();
    await createGrant.clickNo();
    const openWallet = async () => {
        await createGrant.clickCreateSlate();
    };
    const acceptTransaction = async () => {
        await popup.clickAccept();
    };
    await popup.doStuffInWalletPopup(openWallet, acceptTransaction);
});

When(/^I enter the slate details on the Panvala Create a Governance Slate page$/, async () => {
    const uniqueId = new Date().valueOf();
    await createGovernance.enterEmail(`peter.yinusa+${uniqueId}@gmail.com`);
    await createGovernance.enterFirstName(`Peter${uniqueId}`);
    await createGovernance.enterLastName(`Yinusa${uniqueId}`);
    await createGovernance.enterOrganizationName(`Panvala ${uniqueId} Ltd`);
    await createGovernance.enterDescription(`Description ${uniqueId}`);
    await createGovernance.clickRecommendNoAction();
    await createGovernance.clickNo();
    const openWallet = async () => {
        await createGovernance.clickCreateSlate();
    };
    const acceptTransaction = async () => {
        await popup.clickAccept();
    };
    await popup.doStuffInWalletPopup(openWallet, acceptTransaction);
});
