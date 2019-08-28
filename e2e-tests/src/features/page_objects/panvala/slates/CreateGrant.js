import { BaseSlate } from './BaseSlate';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { Grants } from '../components/Grants';

class CreateGrant extends BaseSlate {

  constructor() {
    super('/slates/create/grant');
    this.description = () => new HtmlElement('textarea[name="description"]');
    this.recommendGrantProposals = () => new HtmlElement('input[value="grant"]');
    this.recommendNoAction = () => new HtmlElement('input[value="noAction"]');
  }

  enterDescription(description) {
    return this.description().type(description);
  }

  clickRecommendGrantProposals() {
    return this.recommendGrantProposals().click();
  }

  clickRecommendNoAction() {
    return this.recommendNoAction().click();
  }

  selectGrant(number) {
    return new Grants(number).clickCard();
  }

}

export { CreateGrant };
