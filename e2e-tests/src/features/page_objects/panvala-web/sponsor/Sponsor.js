import { BasePanvalaWeb } from '../BasePanvalaWeb';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { TextBox } from '../../../framework/controls/TextBox';
import { Select } from '../../../framework/controls/Select';

class Sponsor extends BasePanvalaWeb {

  constructor() {
    super('/sponsor');
    this.sponsorNow = () => new HtmlElement('#donate-now-route-button');
    this.company = () => new TextBox('#pledge-company');
    this.firstName = () => new TextBox('#pledge-first-name');
    this.lastName = () => new TextBox('#pledge-last-name');
    this.email = () => new TextBox('#pledge-email');
    this.amount = () => new TextBox('#pledge-amount');
    this.duration = () => new Select('#pledge-duration-select');
    this.donate = () => new HtmlElement('input[value="Donate"]');
  }

  clickSponsorNow() {
    return this.sponsorNow().click();
  }

  enterCompany(company) {
    return this.company().type(company);
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

  enterAmount(amount) {
    return this.amount().type(amount);
  }

  selectDuration(duration) {
    return this.duration().select(duration);
  }

  clickDonate() {
    return this.donate().click();
  }
}

export { Sponsor };
