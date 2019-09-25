import { BasePanvala } from '../BasePanvala';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { ProposalsCard } from '../components/ProposalsCard';

class Proposals extends BasePanvala {

  constructor() {
    super('/proposals');
    this.addProposal = () => new HtmlElement('a[href="/proposals/create"]');
    this.proposalDeadline = () => new HtmlElement('.Deadline__StyledDeadline-sc-1a3aqlz-0');
  }

  clickAddProposal() {
    return this.addProposal().click();
  }

  async getProposalDeadline() {
    return await this.proposalDeadline().getText();
  }

  selectProposal(number) {
    return new ProposalsCard(number).clickCard();
  }

  async selectLastProposal() {
    const number = await new ProposalsCard().getCardsCount();
    return new ProposalsCard(number).clickCard();
  } 

}

export { Proposals };
