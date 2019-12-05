import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { TextBox } from '../../../framework/controls/TextBox'

class TimeTravel {

  constructor() {
    this.root = '.Flex-sc-1qv9hxw-0.cprIYi ';
    this.epoch = () => new TextBox(this.root + 'input:nth-child(1)');
    this.stage = () => new TextBox(this.root + 'input:nth-child(2)');
    this.timeTravel = () => new HtmlElement(this.root + 'button');
    this.currentEpoch = () => new HtmlElement(this.root + '.Box-os6zh6-0:nth-child(1)');
    this.currentStage = () => new HtmlElement(this.root + '.Box-os6zh6-0:nth-child(2)');
  }

  async enterEpoch(epoch) {
    await this.epoch().clear();
    return this.epoch().type(epoch);
  }

  async enterStage(stage) {
    await this.stage().clear();
    return this.stage().type(stage);
  }

  clickTimeTravel() {
    return this.timeTravel().click();
  }

  async getCurrentEpoch() {
    return await this.currentEpoch().getText();
  }

  async getCurrentStage() {
    return await this.currentStage().getText();
  }

};

export { TimeTravel };
