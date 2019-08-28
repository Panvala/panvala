import { BasePanvala } from '../BasePanvala';
import { HtmlElement } from '../../../framework/controls/HtmlElement';

class Proposals extends BasePanvala {

  constructor() {
    super('/proposals');
    this.addProposal = () => new HtmlElement('a[href="/proposals/create"]');
    this.proposalDeadline = () => new HtmlElement('.Deadline__StyledDeadline-sc-1a3aqlz-0');
  }

  clickAddProposal() {
    return this.addProposal().click();
  }

  getProposalDeadline() {
    return this.proposalDeadline().getText();
  }

}

export { Proposals };
