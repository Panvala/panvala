import { BasePanvala } from '../BasePanvala';
import { HtmlElement } from '../../../framework/controls/HtmlElement';

class Slates extends BasePanvala {

  constructor() {
    super('/slates');
    this.addSlate = () => new HtmlElement('a[href="/slates/create"]');
    this.ballotOpens = () => new HtmlElement('.Deadline__StyledDeadline-sc-1a3aqlz-0');
  }

  clickAddSlate() {
    return this.addSlate().click();
  }

  getBallotOpeningTime() {
    return this.slateStakingDeadline().getText();
  }

}

export { Slates };
