import { BasePanvalaApp } from '../BasePanvalaApp';
import { HtmlElement } from '../../../framework/controls/HtmlElement';
import { TextBox } from '../../../framework/controls/TextBox';

class Wallet extends BasePanvalaApp {

  constructor() {
    super('/wallet');
    this.hotWallet = () => new TextBox('input[name="hot-wallet"]');
    this.hotWalletConfirm = () => new HtmlElement('.Flex-sc-1qv9hxw-0:nth-child(5) button');
    this.coldWallet = () => new TextBox('input[name="cold-wallet"]');
    this.coldWalletConfirm = () => new HtmlElement('.Flex-sc-1qv9hxw-0:nth-child(8) button');
    this.continue = () => new HtmlElement('.Flex-sc-1qv9hxw-0:nth-child(10) button');
  }

  enterHotWalletAddress(hotWallet) {
    return this.hotWallet().type(hotWallet);
  }
  
  clickHotWalletConfirm() {
    return this.hotWalletConfirm().click();
  }

  enterColdWalletAddress(coldWallet) {
    return this.coldWallet().type(coldWallet);
  }

  clickColdWalletConfirm() {
    return this.coldWalletConfirm().click();
  }

  clickContinue() {
    return this.continue().click();
  }

}

export { Wallet };
