import { BasePanvalaWeb } from '../BasePanvalaWeb';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { TextBox } from '../../../framework/controls/TextBox';

class Poll extends BasePanvalaWeb {

  constructor() {
    super('/poll');
    this.viewPoll = () => new HtmlElement('.bottom-clip-hero>div button');
    this.category1 = () => new TextBox('#poll-points-category-0');
    this.category2 = () => new TextBox('#poll-points-category-1');
    this.category3 = () => new TextBox('#poll-points-category-2');
    this.category4 = () => new TextBox('#poll-points-category-3');
    this.category5 = () => new TextBox('#poll-points-category-4');
    this.category6 = () => new TextBox('#poll-points-category-5');
    this.firstName = () => new TextBox('#poll-first-name');
    this.lastName = () => new TextBox('#poll-last-name');
    this.email = () => new TextBox('#poll-email');
    this.submitVote = () => new HtmlElement('input[value="Submit Vote"]');
  }

  clickViewPoll() {
    return this.viewPoll().click();
  }

  enterCategoryOne(category1) {
    return this.category1().type(category1);
  }

  enterCategoryTwo(category2) {
    return this.category2().type(category2);
  }
  enterCategoryThree(category3) {
    return this.category3().type(category3);
  }

  enterCategoryFour(category4) {
    return this.category4().type(category4);
  }

  enterCategoryFive(category5) {
    return this.category5().type(category5);
  }

  enterCategorySix(category6) {
    return this.category6().type(category6);
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

  clickSubmitVote() {
    return this.submitVote().click();
  }
}

export { Poll };
