import { BasePanvalaWeb } from '../BasePanvalaWeb';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { TextBox } from '../../../framework/controls/TextBox';
import { Select } from '../../../framework/controls/Select';

class Pledge extends BasePanvalaWeb {

  constructor() {
    super('/pledge');
    this.pledgeNow = () => new HtmlElement('#donate-now-route-button');
    this.firstName = () => new TextBox('#pledge-first-name');
    this.lastName = () => new TextBox('#pledge-last-name');
    this.email = () => new TextBox('#pledge-email');
    this.tier = () => new Select('#pledge-tier-select');
    this.pledge = () => new HtmlElement('input[value="Pledge"]');
  }

  clickPledgeNow() {
    return this.pledgeNow().click();
  }

  enterFirstName(firstName) {
    return this.firstName().type(firstName);
  }

  enterLastName(lastName) {
    return this.lastName().type(lastName);
  }
  enterEmail(email) {
    return this.email().type(email);
  }

  selectTier(tier) {
    return this.tier().select(tier);
  }

  clickPledge() {
    return this.pledge().click();
  }

}

export { Pledge };
