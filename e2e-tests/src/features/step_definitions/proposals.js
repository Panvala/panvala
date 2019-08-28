import { When } from 'cucumber';
import panvala from '../page_objects/panvala/index';
import { AWARD_ADDRESS } from '../config/testConfig';
const proposals = new panvala.Proposals();
const createProposals = new panvala.CreateProposals();


When(/^I navigate to the proposals page$/, async function() {
  await proposals.openPage();
});

When(/^I click add a proposal on the Panvala Proposal page$/, async () => {
  await proposals.clickAddProposal();
});

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
