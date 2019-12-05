import { BaseSlate } from './BaseSlate';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { TextBox } from '../../../framework/controls/TextBox';
import { GrantsCard } from '../components/GrantsCard';

class CreateGrant extends BaseSlate {

  constructor() {
    super('/slates/create/grant');
    this.description = () => new TextBox('textarea[name="description"]');
    this.recommendGrantProposals = () => new HtmlElement('input[value="grant"]');
    this.recommendNoAction = () => new HtmlElement('input[value="noAction"]');
  }

  async enterDescription(description) {
    await this.description().clear();
    return this.description().type(description);
  }

  clickRecommendGrantProposals() {
    return this.recommendGrantProposals().click();
  }

  clickRecommendNoAction() {
    return this.recommendNoAction().click();
  }

  selectGrant(number) {
    return new GrantsCard(number).clickCard();
  }

}

export { CreateGrant };
