import * as React from 'react';
import { useState, useEffect } from 'react';
import { providers, utils } from 'ethers';
import { sliceDecimals } from '../utils/format';
import { loadContracts } from '../utils/env';

interface State {
  account: string;
  balances: {
    pan: string;
    eth: string;
  };
  connectWallet(): void;
}

const initialState: State = {
  account: '',
  balances: {
    pan: '',
    eth: '',
  },
  connectWallet: () => null,
};

export const EthereumContext = React.createContext(initialState);

const EthereumProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [balances, setBalances] = useState({
    pan: '',
    eth: '',
  });
  const [provider, setProvider]: [providers.Web3Provider | undefined, any] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      // Listen for network changes -> reload page
      window.ethereum.on('networkChanged', network => {
        console.log('MetaMask network changed:', network);
        window.location.reload();
      });
    }
  }, []);

  useEffect(() => {
    async function getBalance() {
      const { token } = await loadContracts(provider);

      let acct: string | undefined = (await provider.listAccounts())[0];

      // User has not enabled the app. Trigger metamask pop-up.
      if (!acct) {
        acct = await setSelectedAccount();
      }

      // Do not proceed with callback (setSelectedAccount)
      if (!acct) {
        return false;
      }

      const bal = await token.balanceOf(acct);
      const balance = utils.formatUnits(bal, 18);
      if (provider) {
        const ethBalance = await provider.getBalance(acct);
        setBalances({ eth: ethBalance.toString(), pan: sliceDecimals(balance.toString()) });
        return balance;
      }
    }

    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined' &&
      typeof provider !== 'undefined'
    ) {
      // Only set selectedAccount if user is connected to the app
      // (works even with 0 balance)
      getBalance().then(bal => bal && setSelectedAccount());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  useEffect(() => {
    // // Do this every time the account changes
    // updateVotingStatus();

    if (account !== '') {
      window.ethereum.on('accountsChanged', network => {
        console.log('MetaMask account changed:', network);
        window.location.reload();
      });
    }
  }, [account]);

  async function connectWallet() {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      if (typeof provider === 'undefined') {
        const p = new providers.Web3Provider(window.ethereum);
        // const network = await p.getNetwork();
        // if (network.chainId !== 1) {
        //   alert('Please connect to the Main Ethereum Network to continue.');
        //   return;
        // }

        setProvider(p);
        const acct = (await p.listAccounts())[0];
        return acct;
      } else if (!account) {
        return setSelectedAccount();
      }
    } else {
      alert('MetaMask not found. Please download MetaMask @ metamask.io');
    }
  }

  async function setSelectedAccount() {
    if (provider) {
      let selectedAccount = (await provider.listAccounts())[0];
      // user not enabled for this app
      if (!selectedAccount) {
        try {
          selectedAccount = (await window.ethereum.enable())[0];
        } catch (error) {
          if (error.stack.includes('User denied account authorization')) {
            alert(
              'MetaMask not enabled. In order to respond to the poll, you must authorize this app.'
            );
          }
        }
      }
      await setAccount(selectedAccount);
      return selectedAccount;
    }
  }

  return (
    <EthereumContext.Provider value={{ provider, account, balances, connectWallet }}>
      {children}
    </EthereumContext.Provider>
  );
};

export default EthereumProvider;
