import { When } from 'cucumber';
import panvala from '../page_objects/panvala/index';
const proposals = new panvala.Proposals();

When(/^I navigate to the proposals page$/, async () => {
  await proposals.openPage();
});

When(/^I click add a proposal on the Panvala Proposal page$/, async () => {
  await proposals.clickAddProposal();
});

When(/^I click the last proposal card on the Panvala Proposal page$/, async () => {
  await proposals.selectLastProposal();
});
