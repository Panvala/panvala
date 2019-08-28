import { BasePanvala } from '../BasePanvala';
import { HtmlElement } from '../../../framework/controls/HtmlElement';

class Slates extends BasePanvala {

  constructor() {
    super('/slates');
    this.addSlate = () => new HtmlElement('a[href="/slates/create"]');
    this.slateStakingDeadline = () => new HtmlElement('.Deadline__StyledDeadline-sc-1a3aqlz-0');
    this.currentTab = () => new HtmlElement('.VisibilityFilter__VisibilityFilterContainer-sc-1b1hgnt-0 div:nth-child(1)');
    this.pastTab = () => new HtmlElement('.VisibilityFilter__VisibilityFilterContainer-sc-1b1hgnt-0 div:nth-child(2)');
  }

  clickAddSlate() {
    return this.addSlate().click();
  }

  getSlateStakingDeadline() {
    return this.slateStakingDeadline().getText();
  }

  async clickTab(tab) {
    let tabElement;
    switch (tab) {
      case 'past':
        tabElement = await this.pastTab();
        break;
      case 'current':
        tabElement = await this.currentTab();
        break;
      default:
        throw new Error(`Please specify a valid tab, unknown tab $(tab)`);
    }
    return tabElement.click();
  }

}

export { Slates };
