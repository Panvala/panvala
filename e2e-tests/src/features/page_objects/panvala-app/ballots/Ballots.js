import { BasePanvalaApp } from "../BasePanvalaApp";
import { HtmlElement } from '../../../framework/controls/HtmlElement';

class Ballots extends BasePanvalaApp {

  constructor() {
    super('/ballots');
    this.ballotOpens = () => new HtmlElement('.Deadline__StyledDeadline-sc-1a3aqlz-0');
  }

  getBallotOpeningTime() {
    return this.slateStakingDeadline().getText();
  }

}

export { Ballots };
