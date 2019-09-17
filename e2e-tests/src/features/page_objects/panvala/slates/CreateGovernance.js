import { BaseSlate } from './BaseSlate';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { TextBox } from '../../../framework/controls/TextBox';

class CreateGovernance extends BaseSlate {

  constructor() {
    super('/slates/create/grant');
    this.description = () => new TextBox('textarea[name="summary"]');
    this.recommendGovernanceProposals = () => new HtmlElement('input[value="governance"]');
    this.recommendNoAction = () => new HtmlElement('input[value="noAction"]');
    this.slateStakeAmount= () => new TextBox('input[placeholder="Number"]');
    this.gatekeeperAddress = () => new TextBox('input[placeholder="Address"]');
  }

  async enterDescription(description) {
    await this.description().clear();
    return this.description().type(description);
  }

  clickRecommendGovernanceProposals() {
    return this.recommendGovernanceProposals().click();
  }

  clickRecommendNoAction() {
    return this.recommendNoAction().click();
  }

  enterSlateStakeAmount(slateStakeAmount) {
    return this.slateStakeAmount().type(slateStakeAmount);
  }

  enterGatekeeperAddress(gatekeeperAddress) {
    return this.gatekeeperAddress().type(gatekeeperAddress);
  }

}

export { CreateGovernance };
