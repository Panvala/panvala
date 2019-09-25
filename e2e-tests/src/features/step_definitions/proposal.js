import { Then } from 'cucumber';
import panvala from '../page_objects/panvala/index';
import { expect } from 'chai';
const proposal = new panvala.Proposal();

Then(/^The first name is displayed on the Panvala Proposal page$/, async function() {
  const actual = await proposal.getCreatedBy();
  const accountInfo = this.getProposalInfo();
  const expected = accountInfo.firstname;
  expect(actual).to.include(expected);
});

Then(/^The project name is displayed on the Panvala Proposal page$/, async function() {
  const actual = await proposal.getProposalTitle();
  const accountInfo = this.getProposalInfo();
  const expected = accountInfo.projectName;
  expect(actual).to.include(expected);
});

Then(/^The project summary is displayed on the Panvala Proposal page$/, async function() {
  const actual = await proposal.getProjectSummary();
  const accountInfo = this.getProposalInfo();
  const expected = accountInfo.projectSummary;
  expect(actual).to.include(expected);
});

Then(/^The tokens requested is displayed on the Panvala Proposal page$/, async function() {
  const actual = await proposal.getTokensRequested();
  const accountInfo = this.getProposalInfo();
  const expected = accountInfo.tokensRequested;
  expect(actual).to.include(expected);
});
