import { Given } from 'cucumber';
import { METAMASK_PASSWORD, METAMASK_SEED, METAMASK_NETWORK_NAME, METAMASK_NETWORK_URL } from '../config/envConfig';
import metamask from '../page_objects/metamask/index';
const welcome = new metamask.Welcome();
const selectAction = new metamask.SelectAction();
const metaMetrics = new metamask.MetaMetrics();
const createPassword = new metamask.CreatePassword();
const endOfFlow = new metamask.EndOfFlow();
const popup = new metamask.Popup();

Given(/^I have a MetaMask wallet$/, {timeout: 60 * 1000}, async () => {
  await welcome.switchToNewWindow(null, 2);
  await welcome.clickGetStarted();
  await selectAction.clickImportWallet();
  await metaMetrics.clickNoThanks();
  await createPassword.enterWalletSeed(METAMASK_SEED);
  await createPassword.enterPassword(METAMASK_PASSWORD);
  await createPassword.enterConfirmPassword(METAMASK_PASSWORD);
  await createPassword.acceptTerms();
  await createPassword.clickImport();
  await endOfFlow.clickAllDone();
});

Given(/^I have connected my wallet with Panvala$/, async () => {
  const openWallet = async () => {
    await welcome.navigateTo('http://localhost:3000');
  };
  const connectToPanvala = async () => {
    await popup.clickAccept();
  };
  await popup.doStuffInWalletPopup(openWallet, connectToPanvala);
});

Given(/^I have switched network in my MetaMask wallet$/, async () => {
  await popup.openPage();
  const selectNetwork = async () => {
    await popup.selectCustomNetwork(METAMASK_NETWORK_NAME, METAMASK_NETWORK_URL);
  };
  await popup.doStuffInWallet(selectNetwork);
});
