import * as React from 'react';
import { utils, providers } from 'ethers';
import { connectProvider, connectContracts } from '../utils/provider';
import { IContracts, IEthereumContext } from '../interfaces';
import { toast } from 'react-toastify';

export const EthereumContext: React.Context<IEthereumContext> = React.createContext<any>({});

// extend the global object to include ethereum (metamask ethereum provider)
declare global {
  interface Window {
    ethereum: any;
  }
}

export default class EthereumProvider extends React.Component<any, IEthereumContext> {
  state: any = {
    account: '',
    panBalance: utils.bigNumberify('0'),
    gkAllowance: utils.bigNumberify('0'),
    votingRights: utils.bigNumberify('0'),
  };

  handleConnectEthereum = async () => {
    try {
      if (typeof window !== 'undefined' && window.hasOwnProperty('ethereum')) {
        // this means metamask is installed. get the ethereum provider
        const { ethereum }: Window = window;
        let panBalance: utils.BigNumber = this.state.panBalance;
        let gkAllowance: utils.BigNumber = this.state.gkAllowance;
        let votingRights: utils.BigNumber = this.state.votingRights;
        // wrap it with ethers
        const ethProvider: providers.Web3Provider = await connectProvider(ethereum);

        // contract abstractions (w/ metamask signer)
        const contracts: IContracts = await connectContracts(ethProvider);
        console.log('contracts:', contracts);

        const unlocked: boolean = await ethereum._metamask.isUnlocked();
        if (!unlocked) {
          this.props.onHandleNotification({ action: 'Sign in with MetaMask' });
        }
        let account: string | undefined;

        const enabled = await ethereum._metamask.isEnabled();
        if (!enabled) {
          // pop-up metamask to authorize panvala-app (account signature validation)
          const addresses: string[] = await ethereum.enable();
          // first account
          account = utils.getAddress(addresses[0]);
          if (account) {
            toast.success('MetaMask successfully connected!');
          }
        } else {
          account = utils.getAddress(ethereum.selectedAddress);
        }
        console.log('account:', account);

        if (contracts.token) {
          // get the token balance and gate_keeper allowance
          [panBalance, gkAllowance, votingRights] = await this.getBalances(account, contracts);
        }

        this.setState({
          account,
          ethProvider,
          contracts,
          panBalance,
          gkAllowance,
          votingRights,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Error while attempting to connect to Ethereum.');
    }
  };

  getBalances = async (account: string, contracts: IContracts) => {
    const [panBalance, gkAllowance, votingRights]: utils.BigNumber[] = await Promise.all([
      contracts.token.functions.balanceOf(account),
      contracts.token.functions.allowance(account, contracts.gateKeeper.address),
      contracts.gateKeeper.functions.voteTokenBalance(account),
    ]);
    return [panBalance, gkAllowance, votingRights];
  };

  render() {
    console.log('ETH state:', this.state);
    return (
      <EthereumContext.Provider
        value={{ ...this.state, onConnectEthereum: this.handleConnectEthereum }}
      >
        {this.props.children}
      </EthereumContext.Provider>
    );
  }
}
