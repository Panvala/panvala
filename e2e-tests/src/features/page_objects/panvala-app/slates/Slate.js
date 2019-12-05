import { BasePanvalaApp } from '../BasePanvalaApp';
import { HtmlElement } from '../../../framework/controls/HtmlElement';

class Slate extends BasePanvalaApp {

  constructor() {
    super('/slates/');
    this.stakeTokens = () => new HtmlElement('a[href="/slates/3/stake"]');
    this.title = () => new HtmlElement('.RouteTitle-ehvjdd-0');
    this.description = () => new HtmlElement('.slate__MainColumn-r1ulgi-3 div.Box-os6zh6-0');
    this.stakingRequirement = () => new HtmlElement('div.SlateSidebar__TokensSection-sc-1ptn2wj-1:nth-of-type(1) div.Box-os6zh6-0');
    this.createdBy = () => new HtmlElement('div.SlateSidebar__TokensSection-sc-1ptn2wj-1:nth-of-type(3) div.Box-os6zh6-0');
    this.address = () => new HtmlElement('div.SlateSidebar__TokensSection-sc-1ptn2wj-1:nth-of-type(3) div.Card__CardAddress-h3ymxi-5');
    this.organization = () => new HtmlElement('div.SlateSidebar__TokensSection-sc-1ptn2wj-1:nth-of-type(3) div.Box-os6zh6-0:nth-of-type(5)');
  }

  clickSlakeTokens() {
    return this.stakeTokens().click();
  }

  async getTitle() {
    return await this.title().getText();
  }

  async getDescription() {
    return await this.description().getText();
  }

  async getStakingRequirement() {
    return await this.stakingRequirement().getText();
  }

  async getCreatedBy() {
    return await this.createdBy().getText();
  }

  async getAddress() {
    return await this.address().getText();
  }

  async getOrganization() {
    return await this.organization().getText();
  }

}

export { Slate };
