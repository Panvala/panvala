import { BasePanvalaApp } from '../BasePanvalaApp';
import { HtmlElement } from '../../../framework/controls/HtmlElement';

class Proposal extends BasePanvalaApp {

  constructor() {
    super('/proposals/');
    this.proposalLabel = () => new HtmlElement('.Tag__Wrapper-l3n6sk-1 ceKKQx');
    this.proposalTitle = () => new HtmlElement('h1.RouteTitle-ehvjdd-0');
    this.tokensRequested = () => new HtmlElement('.SlateSidebar__TokensSection-sc-1ptn2wj-1:nth-child(1) div:nth-child(2)');
    this.createdBy = () => new HtmlElement('.SlateSidebar__TokensSection-sc-1ptn2wj-1:nth-child(3) div:nth-child(2)');
    this.includedInSlates = () => new HtmlElement('.SlateSidebar__TokensSection-sc-1ptn2wj-1:nth-child(3) div:nth-child(4)');
    this.projectSummary = () => new HtmlElement('.slate__MainColumn-r1ulgi-3 div.Copy__StyledCopy-sc-1xmn5bn-0:nth-child(2)');
    this.projectTimeline = () => new HtmlElement('.slate__MainColumn-r1ulgi-3 div.Copy__StyledCopy-sc-1xmn5bn-0:nth-child(4)');
    this.projectTeam = () => new HtmlElement('.slate__MainColumn-r1ulgi-3 div.Copy__StyledCopy-sc-1xmn5bn-0:nth-child(6)');
  }

  async getProposalLabel() {
    return await this.proposalLabel().getText();
  }

  async getProposalTitle() {
    return await this.proposalTitle().getText();
  }

  async getTokensRequested() {
    return await this.tokensRequested().getText();
  }

  async getCreatedBy() {
    return await this.createdBy().getText();
  }

  async getIncludedInSlates() {
    return await this.includedInSlates().getText();
  }

  async getProjectSummary() {
    return await this.projectSummary().getText();
  }

  async getProjectTimeline() {
    return await this.projectTimeline().getText();
  }

  async getProjectTeam() {
    return await this.projectTeam().getText();
  }

}

export { Proposal };
