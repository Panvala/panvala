import { Then } from 'cucumber';
import panvala from '../page_objects/panvala/index';
import { expect } from 'chai';
const ballots = new panvala.Ballots();
const parameters = new panvala.Parameters();
const createProposals = new panvala.CreateProposals();
const proposal = new panvala.Proposal();
const proposals = new panvala.Proposals();
const createGovernance = new panvala.CreateGovernance();
const createGrant = new panvala.CreateGrant();
const createSlates = new panvala.CreateSlates();
const slate = new panvala.Slate();
const slates = new panvala.Slates();
const wallet = new panvala.Wallet();

Then(/^The Panvala "(.*)" page is displayed$/, {timeout: 15 * 1000}, async (pageName) => {
  const pagesMap = {
    Ballots: ballots,
    Parameters: parameters,
    CreateProposals: createProposals,
    Proposal: proposal,
    Proposals: proposals,
    CreateGovernance: createGovernance,
    CreateGrant: createGrant,
    CreateSlates: createSlates,
    Slate: slate,
    Slates: slates,
    Wallet: wallet
  };
  const page = pagesMap[pageName];
  const result = await page.isDisplayed();
  expect(result).to.equal(true);
});
