import { BasePage } from '../../framework/page_object/BasePage';
import { getDriver } from '../../framework/driver/driverFactory';
import { METAMASK_URL } from '../../config/envConfig';

class BaseMetaMask extends BasePage {

  constructor(path) {
    super(METAMASK_URL, path);
  }

  async doStuffInWallet(stuff) {
    console.log(`Do in wallet`);
    await this.resizeWindow(-1180,-160);
    await stuff();
    return this.maximizeWindow();
  }

  async doStuffInWalletPopup(openWallet, stuff) {
    console.log(`Do in wallet popop`);
    const oldHandle = await getDriver().getWindowHandle();
    const originalHandles = await getDriver().getAllWindowHandles();
    await openWallet();
    await this.switchToNewWindow(originalHandles);
    await stuff();
    return this.switchToWindow(oldHandle);
  }
}

export { BaseMetaMask };
