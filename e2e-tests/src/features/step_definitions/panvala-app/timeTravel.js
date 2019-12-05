import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';
import components from '../../page_objects/panvala-app/components/index'
const timeTravel = new components.TimeTravel();
import metamask from '../../page_objects/metamask/index';
const popup = new metamask.Popup();

const doTimeTravel = async () => {
  const openWallet = async () => {
    await timeTravel.clickTimeTravel();
  };
  const acceptTransaction = async () => {
      await popup.clickAccept();
  };
  await popup.doStuffInWalletPopup(openWallet, acceptTransaction);
}

Given(/^I Time Travel to the "(.*)" stage in Panvala$/, async (expectedStage) => {
  const stagesMap = {
    slatesubmission: 0,
    intermission: 1,
    commitvoting: 2,
    revealvoting: 3
  };
  const currentStage = await timeTravel.getCurrentStage();
  const actualStage = currentStage.split(/\r?\n/)[0].split(/\s/)[3].toLowerCase().replace('(', '').replace(')', '');
  expectedStage = expectedStage.replace(/\s+/, '').toLowerCase();
  if (actualStage !== expectedStage) {
    const toStage = stagesMap[expectedStage];
    await timeTravel.enterStage(toStage);
    await doTimeTravel();
  }
});

When(/^I enter the epoch "(.*)" on the Panvala Time Travel page$/, async (epoch) => {
  await timeTravel.enterEpoch(epoch);
});

When(/^I enter the stage "(.*)" on the Panvala Time Travel page$/, async (stage) => {
  await timeTravel.enterStage(stage);
});

When(/^I click Time Travel on the Panvala Time Travel page$/, async () => {
  await doTimeTravel();
});

Then(/^The current epoch reads "(.*)" on the Panvala Time Travel page$/, async (expectedText) => {
  const actualText = await timeTravel.getCurrentEpoch();
  expect(actualText).to.equal(expectedText);
});

Then(/^The current stage reads "(.*)" on the Panvala Time Travel page$/, async (expectedText) => {
  const currentStage = await timeTravel.getCurrentStage();
  const actualText = currentStage.split(/\r?\n/)[0];
  expect(actualText).to.equal(expectedText);
});
