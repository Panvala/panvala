import { BasePanvala } from '../BasePanvala';
import { HtmlElement } from '../../../framework/controls/HtmlElement';

class Proposal extends BasePanvala {

  constructor() {
    super('/proposals/');
    this.proposalLabel = () => new HtmlElement('.Tag__Wrapper-l3n6sk-1 ceKKQx');
    this.proposalTitle = () => new HtmlElement('h1.RouteTitle-ehvjdd-0');
    this.tokensRequested = () => new HtmlElement('.SlateSidebar__TokensSection-sc-1ptn2wj-1:nth-child(1) div:nth-child(2)');
    this.createdBy = () => new HtmlElement('.SlateSidebar__TokensSection-sc-1ptn2wj-1:nth-child(3) div:nth-child(2)');
    this.includedInSlated = () => new HtmlElement('.SlateSidebar__TokensSection-sc-1ptn2wj-1:nth-child(3) div:nth-child(4)');
    this.projectSummary = () => new HtmlElement('.slate__MainColumn-r1ulgi-3 div.Copy__StyledCopy-sc-1xmn5bn-0:nth-child(2)');
    this.projectTimeline = () => new HtmlElement('.slate__MainColumn-r1ulgi-3 div.Copy__StyledCopy-sc-1xmn5bn-0:nth-child(4)');
    this.projectTeam = () => new HtmlElement('.slate__MainColumn-r1ulgi-3 div.Copy__StyledCopy-sc-1xmn5bn-0:nth-child(6)');
  }

}

export { Proposal };
