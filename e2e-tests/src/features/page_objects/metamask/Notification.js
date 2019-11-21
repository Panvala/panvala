import { BaseMetaMask } from './BaseMetaMask';
import { TextBox } from '../../framework/controls/TextBox'

class Notification extends BaseMetaMask {

  constructor() {
    super('/notification.html');
    this.gasPrice = () => new TextBox('input.advanced-gas-inputs__gas-edit-row__input');
  }

  async enterGasPrice(price) {
    await this.gasPrice().clear();
    return await this.gasPrice().type(price);
  }

}

export { Notification };
