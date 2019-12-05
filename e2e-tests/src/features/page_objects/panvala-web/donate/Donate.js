import { BasePanvalaWeb } from '../BasePanvalaWeb';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { TextBox } from '../../../framework/controls/TextBox';
import { Select } from '../../../framework/controls/Select';

class Donate extends BasePanvalaWeb {

  constructor() {
    super('/donate');
    this.donateNow = () => new HtmlElement('#donate-now-route-button');
    this.firstName = () => new TextBox('#pledge-first-name');
    this.lastName = () => new TextBox('#pledge-last-name');
    this.email = () => new TextBox('#pledge-email');
    this.tier = () => new Select('#pledge-tier-select');
    this.duration = () => new Select('#pledge-duration-select');
    this.donate = () => new HtmlElement('input[value="Donate"]');
  }

  clickDonateNow() {
    return this.donateNow().click();
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

  selectDuration(duration) {
    return this.duration().select(duration);
  }

  clickDonate() {
    return this.donate().click();
  }
}

export { Donate };
