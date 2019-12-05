import { BasePanvalaApp } from '../BasePanvalaApp';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { TextBox } from '../../../framework/controls/TextBox';

class CreateProposals extends BasePanvalaApp {

  constructor() {
    super('/proposals/create');
    this.firstName = () => new TextBox('input[name="firstName"]');
    this.lastName = () => new TextBox('input[name="lastName"]');
    this.email = () => new TextBox('input[name="email"]');
    this.github = () => new TextBox('input[name="github"]');
    this.projectName = () => new TextBox('input[name="title"]');
    this.website = () => new TextBox('input[name="website"]');
    this.projectSummary = () => new TextBox('textarea[name="summary"]');
    this.projectTimeline = () => new TextBox('textarea[name="projectTimeline"]');
    this.teamBackgrounds = () => new TextBox('textarea[name="teamBackgrounds"]');
    this.totalBudget = () => new TextBox('textarea[name="totalBudget"]');
    this.tokensRequested = () => new TextBox('input[name="tokensRequested"]');
    this.awardAddress = () => new TextBox('input[name="awardAddress"]');
    this.otherFunding = () => new TextBox('textarea[name="otherFunding"]');
    this.back = () => new HtmlElement('.Flex-sc-1qv9hxw-0.bATvpO div:nth-child(1)');
    this.confirmAndSubmit = () => new HtmlElement('.Flex-sc-1qv9hxw-0.bATvpO div:nth-child(2)');
  }

  async enterFirstName(firstName) {
    await this.firstName().clear();
    return this.firstName().type(firstName);
  }

  async enterLastName(lastName) {
    await this.lastName().clear();
    return this.lastName().type(lastName);
  }

  async enterEmail(email) {
    await this.email().clear();
    return this.email().type(email);
  }

  enterGithub(github) {
    return this.github().type(github);
  }

  async enterProjectName(projectName) {
    await this.projectName().clear();
    return this.projectName().type(projectName);
  }

  enterWebsite(website) {
    return this.website().type(website);
  }

  async enterProjectSummary(projectSummary) {
    await this.projectSummary().clear();
    return this.projectSummary().type(projectSummary);
  }

  enterProjectTimeline(projectTimeline) {
    return this.projectTimeline().type(projectTimeline);
  }

  enterTeamBackgrounds(teamBackgrounds) {
    return this.teamBackgrounds().type(teamBackgrounds);
  }

  enterTotalBudget(totalBudget) {
    return this.totalBudget().type(totalBudget);
  }

  async enterTokensRequested(tokensRequested) {
    await this.tokensRequested().clear();
    return this.tokensRequested().type(tokensRequested);
  }

  enterAwardAddress(awardAddress) {
    return this.awardAddress().type(awardAddress);
  }

  enterOtherFunding(otherFunding) {
    return this.otherFunding().type(otherFunding);
  }

  clickBack() {
    return this.back().click();
  }

  clickSubmit() {
    return this.confirmAndSubmit().click();
  }

}

export { CreateProposals };
