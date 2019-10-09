import { BasePanvala } from '../BasePanvala';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { GrantCard } from '../components/GrantCard';
import { GovernanceCard } from '../components/GovernanceCard';

class Slates extends BasePanvala {

  constructor() {
    super('/slates');
    this.addSlate = () => new HtmlElement('a[href="/slates/create"]');
    this.deadline = () => new HtmlElement('.Deadline__StyledDeadline-sc-1a3aqlz-0');
    this.currentTab = () => new HtmlElement('.VisibilityFilter__VisibilityFilterContainer-sc-1b1hgnt-0 div:nth-child(1)');
    this.pastTab = () => new HtmlElement('.VisibilityFilter__VisibilityFilterContainer-sc-1b1hgnt-0 div:nth-child(2)');
  }

  async isDisplayed() {
    const urlIsDisplayed = await super.isDisplayed();
    const deadlineIsDisplayed = await this.deadline().waitForTextToDisappear('loading');
    return urlIsDisplayed && deadlineIsDisplayed;
  }

  clickAddSlate() {
    return this.addSlate().click();
  }

  getDeadline() {
    return this.deadline().getText();
  }

  async clickTab(tab) {
    let tabElement;
    switch (tab) {
      case 'past':
        tabElement = this.pastTab();
        break;
      case 'current':
        tabElement = this.currentTab();
        break;
      default:
        throw new Error(`Please specify a valid tab, unknown tab $(tab)`);
    }
    return tabElement.click();
  }

  selectGrantSlate(number) {
    return new GrantCard(number).clickCard();
  }

  async selectLastGrantSlate() {
    const number = await new GrantCard().getCardsCount();
    return new GrantCard(number).clickCard();
  } 

  selectGovernanceSlate(number) {
    return new GovernanceCard(number).clickCard();
  }

  async selectLastGovernanceSlate() {
    const number = await new GovernanceCard().getCardsCount();
    return new GovernanceCard(number).clickCard();
  }

}

export { Slates };
