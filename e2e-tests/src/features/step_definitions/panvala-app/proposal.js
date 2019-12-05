import { Then } from 'cucumber';
import panvala from '../../page_objects/panvala-app/index';
import { expect } from 'chai';
const proposal = new panvala.Proposal();

Then(/^The first name is displayed on the Panvala Proposal page$/, async function() {
  const actual = await proposal.getCreatedBy();
  const proposalInfo = this.getProposal();
  const expected = proposalInfo.firstname;
  expect(actual).to.include(expected);
});

Then(/^The project name is displayed on the Panvala Proposal page$/, async function() {
  const actual = await proposal.getProposalTitle();
  const proposalInfo = this.getProposal();
  const expected = proposalInfo.projectName;
  expect(actual).to.include(expected);
});

Then(/^The project summary is displayed on the Panvala Proposal page$/, async function() {
  const actual = await proposal.getProjectSummary();
  const proposalInfo = this.getProposal();
  const expected = proposalInfo.projectSummary;
  expect(actual).to.include(expected);
});

Then(/^The tokens requested is displayed on the Panvala Proposal page$/, async function() {
  const actual = await proposal.getTokensRequested();
  const proposalInfo = this.getProposal();
  const expected = proposalInfo.tokensRequested;
  expect(actual).to.include(expected);
});
