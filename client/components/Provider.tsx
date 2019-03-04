import React from 'react';
import { utils, providers } from 'ethers';

type Props = {
  render: any;
  renderLoading: any;
};

export default class Provider extends React.Component<Props> {
  state = {
    account: '',
    provider: {},
  };

  componentWillUnmount() {
    console.log('unmounting..');
  }

  async componentDidMount() {
    try {
      const provider: providers.Web3Provider = new providers.Web3Provider((window as any).ethereum);
      console.log('provider', provider);
      const addresses: any = await (window as any).ethereum.enable();
      this.setState({
        account: utils.getAddress(addresses[0]),
        provider,
      });
    } catch (error) {
      alert(`User denied account access... ${error.message}`);
    }
  }

  render() {
    const { account, provider } = this.state;
    return provider && account
      ? this.props.render({ account, provider })
      : this.props.renderLoading();
  }
}

// hooks

// export default function Provider() {
//   const [userInfo, setUserInfo] = useState({ account: '', provider: {} });

//   async function getEthereum() {
//     const provider = new providers.Web3Provider(window.ethereum);

//     let addresses: any;
//     try {
//       addresses = await window.ethereum.enable();
//       setUserInfo({ account: addresses[0], provider });
//     } catch (error) {
//       console.log('User denied account access...', error);
//     }

//     const bn = await provider.getBlockNumber();
//     console.log("bn:", bn);
//     // return addresses
//     console.log(provider);
//   }

//   useEffect(() => {
//     getEthereum();
//   }, []);

//   return <div>{this.props.children}</div>;
// }
