import { BaseMetaMask } from './BaseMetaMask';
import { HtmlElement } from '../../framework/controls/HtmlElement'

class SettingsAdvanced extends BaseMetaMask {

  constructor() {
    super('/popup.html#settings/advanced');
    this.advancedGasControls = () => new HtmlElement('.settings-page__content-row:nth-of-type(4) .toggle-button div');
    this.showHexData = () => new HtmlElement('.settings-page__content-row:nth-of-type(5) .toggle-button div');
  }

  async clickAdvancedGasControls() {
    await this.showHexData().moveTo();
    return this.advancedGasControls().click();
  }

}

export { SettingsAdvanced };
