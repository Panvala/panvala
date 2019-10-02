import { When } from 'cucumber';
import panvala from '../page_objects/panvala/index';
import { AWARD_ADDRESS } from '../config/testConfig';
const createProposals = new panvala.CreateProposals();

When(/^I enter the proposal details on the Panvala Create Proposals page$/, {timeout: 60 * 1000}, async () => {
  const uniqueId = new Date().valueOf();
  await createProposals.enterFirstName(`Peter${uniqueId}`);
  await createProposals.enterLastName(`Yinusa${uniqueId}`);
  await createProposals.enterEmail(`peter.yinusa+${uniqueId}@gmail.com`);
  await createProposals.enterGithub(`@peter-${uniqueId}`);
  await createProposals.enterProjectName(`Automation Project ${uniqueId}`);
  await createProposals.enterWebsite(`http://www.panvala.com/${uniqueId}`);
  await createProposals.enterProjectSummary(`Project Summary ${uniqueId}`);
  await createProposals.enterProjectTimeline(`Project Timeline ${uniqueId}`);
  await createProposals.enterTeamBackgrounds(`Team Background ${uniqueId}`);
  await createProposals.enterTotalBudget(uniqueId * 1000);
  await createProposals.enterTokensRequested(uniqueId);
  await createProposals.enterAwardAddress(AWARD_ADDRESS);
  await createProposals.enterOtherFunding(`Funding ${uniqueId}`);
  await createProposals.clickSubmit();
});

When(/^I enter the first name "(.*)" on the Panvala Create Proposals page$/, async function(firstname) {
  this.setProposal({firstname: firstname});
  await createProposals.enterFirstName(firstname);
});

When(/^I enter the email "(.*)" on the Panvala Create Proposals page$/, async function(email) {
  this.setProposal({email: email});
  await createProposals.enterEmail(email);
});

When(/^I enter the project name "(.*)" on the Panvala Create Proposals page$/, async function(projectName) {
  const uniqueProjectName = `${projectName}${this.uniqueId}`;
  this.setProposal({projectName: uniqueProjectName});
  await createProposals.enterProjectName(uniqueProjectName);
});

When(/^I enter the project summary "(.*)" on the Panvala Create Proposals page$/, async function(projectSummary) {
  this.setProposal({projectSummary: projectSummary});
  await createProposals.enterProjectSummary(projectSummary);
});

When(/^I enter the tokens requested "(.*)" on the Panvala Create Proposals page$/, async function(tokensRequested) {
  this.setProposal({tokensRequested: tokensRequested});
  await createProposals.enterTokensRequested(tokensRequested);
});

When(/^I enter the award address "(.*)" on the Panvala Create Proposals page$/, async function(awardAddress) {
  this.setProposal({awardAddress: awardAddress});
  await createProposals.enterAwardAddress(awardAddress);
});

When(/^I click Confirm and Submit button on the Panvala Create Proposals page$/, async () => {
  await createProposals.clickSubmit();
});
