import { BasePanvalaWeb } from '../BasePanvalaWeb';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { TextBox } from '../../../framework/controls/TextBox';

class Grants extends BasePanvalaWeb {

  constructor() {
    super('/grants');
    this.applyForGrant = () => new HtmlElement('main>section>div>button');
    this.fullName = () => new TextBox('#grants-full-name');
    this.email = () => new TextBox('#grants-email');
    this.getInTouch = () => new HtmlElement('#grants-application-button');
  }

  clickApplyForGrant() {
    return this.applyForGrant().click();
  }

  enterFullName(fullName) {
    return this.fullName().type(fullName);
  }

  enterEmail(email) {
    return this.email().type(email);
  }

  clickGetInTouch() {
    return this.getInTouch().click();
  }
}

export { Grants };
