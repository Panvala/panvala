import { BaseMetaMask } from './BaseMetaMask';
import { Header } from './components/Header';

class Networks extends BaseMetaMask {

  constructor() {
    super('/home.html#settings/networks');
  }

  async selectNetwork(number) {
    return new Header().selectNetwork(number);
  }

}

export { Networks };
