import { BasePanvala } from '../BasePanvala';
import { HtmlElement } from '../../../framework/controls/HtmlElement';

class Ballots extends BasePanvala {

  constructor() {
    super('/ballots');
    this.ballotOpens = () => new HtmlElement('.Deadline__StyledDeadline-sc-1a3aqlz-0');
  }

  getBallotOpeningTime() {
    return this.slateStakingDeadline().getText();
  }

}

export { Ballots };
