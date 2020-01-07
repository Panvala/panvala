import { BasePanvalaWeb } from '../BasePanvalaWeb';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { TextBox } from '../../../framework/controls/TextBox';

class Team extends BasePanvalaWeb {

  constructor() {
    super('/team');
    this.fullName = () => new TextBox('#contact-full-name');
    this.email = () => new TextBox('#contact-email');
    this.message = () => new TextBox('#contact-message');
    this.getInTouch = () => new HtmlElement('#team-contact-button');
  }

  enterFullName(fullName) {
    return this.fullName().type(fullName);
  }

  enterEmail(email) {
    return this.email().type(email);
  }

  enterMessage(message) {
    return this.message().type(message);
  }

  clickGetInTouch() {
    return this.getInTouch().click();
  }
}

export { Team };
