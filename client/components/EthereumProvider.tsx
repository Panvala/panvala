import * as React from 'react';
import { utils } from 'ethers';
import { connectProvider, connectContracts } from '../utils/provider';

export const EthereumContext = React.createContext({ account: '', ethProvider: {}, contracts: {} });

export default class EthereumProvider extends React.Component {
  state = {
    account: '',
    ethProvider: {},
    contracts: {},
  };

  componentWillUnmount() {
    console.log('unmounting..');
  }

  async componentDidMount() {
    try {
      if (typeof window !== 'undefined') {
        const ethProvider = await connectProvider(window);
        const addresses: any = await (window as any).ethereum.enable();
        const { tcContract, gcContract } = connectContracts(ethProvider);
        console.log('tcContract:', tcContract);
        console.log('gcContract:', gcContract);

        const params = await gcContract.functions.parameters();
        console.log('params:', params);
        const contracts = {
          tcContract,
          gcContract,
        };

        this.setState({
          account: utils.getAddress(addresses[0]),
          ethProvider,
          contracts,
        });
      }
    } catch (error) {
      alert(`Error while attempting to connect to the Ethereum network... ${error.message}`);
    }
  }

  render() {
    const { account, ethProvider, contracts } = this.state;
    const { children } = this.props;
    return (
      <EthereumContext.Provider
        value={{
          account,
          ethProvider,
          contracts,
        }}
      >
        {children}
      </EthereumContext.Provider>
    );
  }
}

// export default class Provider extends React.Component<Props> {
//   state = {
//     account: '',
//     provider: {},
//   };

//   componentWillUnmount() {
//     console.log('unmounting..');
//   }

//   async componentDidMount() {
//     try {
//       const provider: providers.Web3Provider = new providers.Web3Provider((window as any).ethereum);
//       console.log('provider', provider);
//       const addresses: any = await (window as any).ethereum.enable();
//       this.setState({
//         account: utils.getAddress(addresses[0]),
//         provider,
//       });
//     } catch (error) {
//       alert(`User denied account access... ${error.message}`);
//     }
//   }

//   render() {
//     const { account, provider } = this.state;
//     return provider && account
//       ? this.props.render({ account, provider })
//       : this.props.renderLoading();
//   }
// }
