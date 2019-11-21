import { BaseMetaMask } from './BaseMetaMask';
import { Header } from './components/Header';

class Networks extends BaseMetaMask {

  constructor() {
    super('/home.html#settings/networks');
  }

  async selectNetwork(number) {
    return new Header().selectNetwork(number);
  }

  async selectCustomNetwork(networkName, newRpcUrl) {
    await new Header().selectCustomNetwork(networkName, newRpcUrl);
  }
}

export { Networks };
