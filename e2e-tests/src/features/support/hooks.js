import { After, AfterAll, Before, BeforeAll, Status } from 'cucumber'
import { getDriver, buildDriver } from '../framework/driver/driverFactory';
import { PANVALA_APP_URL, DRIVER } from '../config/envConfig';
import fs from 'fs';
import path from 'path';
let driver;

BeforeAll({timeout: 65 * 1000}, async () => {
    await buildDriver(DRIVER);
    driver = getDriver();
    await driver.manage().setTimeouts({implicit: 10000, pageLoad: 30000, script: 5000});
    await driver.manage().window().setRect({width: 1280, height: 1000});
    if (DRIVER.extension !== null) {
        await initialSetup();
    }
    await driver.navigate().to(PANVALA_APP_URL);
});

Before({tags: '@MetaMask_Mainnet'}, async () => {
    await iHaveConnectedMyMetaMaskWalletWithPanvala();
    const mainnet = 1;
    await iHaveSwitchedNetworkInMyMetaMaskWallet(mainnet);
});

Before({tags: '@MetaMask_Local'}, async () => {
    await iHaveConnectedMyMetaMaskWalletWithPanvala();
    const panvalaTestNetwork = 7;
    await iHaveSwitchedNetworkInMyMetaMaskWallet(panvalaTestNetwork);
    await addStorageItems();
});

After({tags: '@MetaMask_Mainnet or @MetaMask_Local'}, async () => {
    await clearPanvalaStorage();
    await iLogOutOfMyMetaMaskWallet();
});

After(async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
        const screenshotPath = 'screenshot';
        if (!fs.existsSync(screenshotPath)) {
            fs.mkdirSync(screenshotPath);
        }
        const data = await driver.takeScreenshot();
        await this.attach(data, 'image/png');
        const base64Data = data.replace(/^data:image\/png;base64,/, '');
        const screenshotFullPath = path.join(screenshotPath, scenario.pickle.name + '.png').replace(/ /g, '_')
        fs.writeFileSync(screenshotFullPath, base64Data, 'base64');
    }
});

AfterAll(async function() {
    await driver.close();
    await driver.quit();
});

const clearPanvalaStorage = async () => {
    await driver.navigate().to(PANVALA_APP_URL);
    await driver.executeScript('window.sessionStorage.clear();');
    await driver.executeScript('window.localStorage.clear();');
    await driver.manage().deleteAllCookies();
}

const addStorageItems = async () => {
    await driver.executeScript(`window.sessionStorage.setItem('CLOSED_MAINNET_MODAL','TRUE');`);
}

import { METAMASK_SEED, METAMASK_PASSWORD } from '../config/envConfig';
import metamask from '../page_objects/metamask/index';
const createPassword = new metamask.CreatePassword();
const endOfFlow = new metamask.EndOfFlow();
const metaMetrics = new metamask.MetaMetrics();
const popup = new metamask.Popup();
const selectAction = new metamask.SelectAction();
const unlock = new metamask.Unlock();
const welcome = new metamask.Welcome();

const initialSetup = async () => {
    const oldHandles = await driver.getAllWindowHandles();
    await driver.navigate().to(PANVALA_APP_URL);
    await welcome.switchToNewWindow(oldHandles);
    await welcome.isDisplayed();
    await welcome.clickGetStarted();
    await selectAction.isDisplayed();
    await selectAction.clickImportWallet();
    await metaMetrics.isDisplayed();
    await metaMetrics.clickNoThanks();
    await createPassword.isDisplayed();
    await createPassword.enterWalletSeed(METAMASK_SEED);
    await createPassword.enterPassword(METAMASK_PASSWORD);
    await createPassword.enterConfirmPassword(METAMASK_PASSWORD);
    await createPassword.acceptTerms();
    await createPassword.clickImport();
    await endOfFlow.isDisplayed();
    await endOfFlow.clickAllDone();
    await popup.header().selectNetwork(4);
    await popup.header().clickLogOut();
    await driver.close();
    await welcome.switchToWindow(oldHandles[0]);
}

const iHaveConnectedMyMetaMaskWalletWithPanvala = async () => {
    const openWallet = async () => {
        await welcome.navigateTo(PANVALA_APP_URL);
    };
    const connectToPanvala = async () => {
        await unlock.enterPassword(METAMASK_PASSWORD);
        await unlock.clickLogIn();
        await popup.clickAccept();
    };
    await popup.doStuffInWalletPopup(openWallet, connectToPanvala);
}

const iHaveSwitchedNetworkInMyMetaMaskWallet = async (network) => {
    await popup.openPage();
    const selectNetwork = async () => {
        await popup.header().selectNetwork(network);
    };
    await popup.doStuffInWallet(selectNetwork);
}

const iLogOutOfMyMetaMaskWallet = async () => {
    await popup.openPage();
    const logOut = async () => {
        await popup.header().clickLogOut();
    };
    await popup.doStuffInWallet(logOut);
}
