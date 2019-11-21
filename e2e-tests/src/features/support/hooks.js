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
    await driver.manage().window().setSize(1280, 1000);
    if (DRIVER.extension !== null) {
        await initialSetup();
    }
});

Before({tags: '@MetaMask_Mainnet'}, async () => {
    await iHaveConnectedMyMetaMaskWalletWithPanvala();
    const mainnet = 1;
    await networks.openPage();
    await networks.selectNetwork(mainnet);
});

Before({tags: '@MetaMask_Rinkeby'}, async () => {
    await iHaveConnectedMyMetaMaskWalletWithPanvala();
    await addStorageItems();
    const rinkeby = 4;
    await networks.openPage();
    await networks.selectNetwork(rinkeby);
});

Before({tags: '@MetaMask_Local'}, async () => {
    await iHaveConnectedMyMetaMaskWalletWithPanvala();
    await addStorageItems();
    const panvalaTestNetwork = 7;
    await networks.openPage();
    await networks.selectNetwork(panvalaTestNetwork);
});

After({tags: '@MetaMask_Mainnet or @MetaMask_Rinkeby or @MetaMask_Local'}, async () => {
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

import { METAMASK_SEED, METAMASK_PASSWORD, METAMASK_NETWORK_NAME, METAMASK_NETWORK_URL, PANVALA_ENV } from '../config/envConfig';
import metamask from '../page_objects/metamask/index';
const createPassword = new metamask.CreatePassword();
const endOfFlow = new metamask.EndOfFlow();
const metaMetrics = new metamask.MetaMetrics();
const networks = new metamask.Networks();
const popup = new metamask.Popup();
const selectAction = new metamask.SelectAction();
const unlock = new metamask.Unlock();
const welcome = new metamask.Welcome();

const initialSetup = async () => {
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
    if (PANVALA_ENV === "local") {
        await networks.openPage();
        await networks.selectCustomNetwork(METAMASK_NETWORK_NAME, METAMASK_NETWORK_URL);
    }
    await popup.header().clickLogOut();
}

const iHaveConnectedMyMetaMaskWalletWithPanvala = async () => {
    await unlock.openPage();
    await unlock.enterPassword(METAMASK_PASSWORD);
    await unlock.clickLogIn();
    const openWallet = async () => {
        await welcome.navigateTo(PANVALA_APP_URL);
    };
    const connectToPanvala = async () => {
        await popup.clickAccept();
    };
    await popup.doStuffInWalletPopup(openWallet, connectToPanvala);
}

const iLogOutOfMyMetaMaskWallet = async () => {
    await popup.openPage();
    const logOut = async () => {
        await popup.header().clickLogOut();
    };
    await popup.doStuffInWallet(logOut);
}
