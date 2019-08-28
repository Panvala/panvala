import { BasePanvala } from '../BasePanvala';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { TextBox } from '../../../framework/controls/TextBox';

class BaseSlate extends BasePanvala {

  constructor(path) {
    super(path);
    this.email = () => new TextBox('input[name="email"]');
    this.firstName = () => new TextBox('input[name="firstName"]');
    this.lastName = () => new TextBox('input[name="lastName"]');
    this.organizationName = () => new TextBox('input[name="organization"]');
    this.yes = () => new HtmlElement('input[value="yes"]');
    this.no = () => new HtmlElement('input[value="no"]');
    this.back = () => new HtmlElement('.Flex-sc-1qv9hxw-0.bATvpO div:nth-child(1)');
    this.createSlate = () => new HtmlElement('.Flex-sc-1qv9hxw-0.bATvpO div:nth-child(2)');
  }

  enterEmail(email) {
    return this.email().type(email);
  }

  enterFirstName(firstName) {
    return this.firstName().type(firstName);
  }

  enterLastName(lastName) {
    return this.lastName().type(lastName);
  }

  enterOrganizationName(organizationName) {
    return this.organizationName().type(organizationName);
  }

  clickYes() {
    return this.yes().click();
  }

  clickNo() {
    return this.no().click();
  }

  clickBack() {
    return this.back().click();
  }

  clickCreateSlate() {
    return this.createSlate().click();
  }

}

export { BaseSlate };
