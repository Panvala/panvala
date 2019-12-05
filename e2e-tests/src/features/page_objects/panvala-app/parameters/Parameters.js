import { BasePanvalaApp } from '../BasePanvalaApp';
import { HtmlElement } from '../../../framework/controls/HtmlElement';

class Parameters extends BasePanvalaApp {

  constructor() {
    super('/parameters');
    this.changeGovernanceParameters = () => new HtmlElement('a[href="/slates/create/governance"]');
    this.slateStakeAmount = () => new HtmlElement('.Flex-sc-1qv9hxw-0.kcRUrP:nth-child(2) div:nth-child(2)');
    this.gatekeeperAddress = () => new HtmlElement('.Flex-sc-1qv9hxw-0.kcRUrP:nth-child(3) div:nth-child(2)');
  }

  clickChangeGovernanceParameters() {
    return this.changeGovernanceParameters().click();
  }

  getSlateStakeAmount() {
    return this.slateStakeAmount().getText();
  }

  getGatekeeperAddress() {
    return this.gatekeeperAddress().getText();
  }

}

export { Parameters };
