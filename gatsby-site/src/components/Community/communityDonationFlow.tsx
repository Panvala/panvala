import React, { useEffect, useState } from 'react';
import { BigNumber, Contract, providers, utils } from 'ethers';
import {
  ICommunityData,
  INetworksData,
  ITokensData,
  NetworkEnums,
  TokenEnums,
} from '../../data';
import { ICommunityDonationFormFields } from './CommunityDonationForm';
import { loadCommunityDonationContracts } from '../../utils/env';

const { formatUnits, parseEther } = utils;

declare global {
  interface Window {
    ethereum: any;
  }
}

interface ICommunityDonationFlowProps {
  community: ICommunityData;
  data: {
    tokens: ITokensData;
    networks: INetworksData;
  };
  [key: string]: any;
}

export const withCommunityDonationFlow = WrappedComponent => {
  return (props: ICommunityDonationFlowProps) => {
    const { tokens, networks } = props.data;

    const initialFormValues: ICommunityDonationFormFields = {
      firstName: '',
      lastName: '',
      email: '',
      paymentToken: '',
      tokenAmount: 0,
      fiatAmount: 0,
    };

    // MetaMask
    const [provider, setProvider] = useState<providers.Web3Provider>();
    const [activeAccount, setActiveAccount] = useState<string>('');
    const [metaMaskNetwork, setMetaMaskNetwork] = useState<string>('');
    const [metaMaskNetworkChangeHandler, setMetaMaskNetworkChangeHandler] = useState();

    // Contracts
    const [factory, setFactory] = useState<Contract>();
    const [router, setRouter] = useState<Contract>();
    const [inputToken, setInputToken] = useState<Contract>();
    const [priceOracle, setPriceOracle] = useState<Contract>();

    // Donation
    const [communityWallet, setCommunityWallet] = useState<string>('');
    const [selectedToken, setSelectedToken] = useState<string>(initialFormValues.paymentToken);
    const [selectedNetwork, setSelectedNetwork] = useState<string>(mapTokenToChainId(initialFormValues.paymentToken));
    
    // Info/Errors
    const [step, setStep] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    // const [isDonating, setIsDonating] = useState<boolean>(false);
    const [donationLoading, setDonationLoading] = useState<boolean>(false);
    const [donationComplete, setDonationComplete] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // ---------------------------------------------------------------------------
    // React Effects
    // ---------------------------------------------------------------------------

    /**
     * Set selected token to first in the list
     */
    useEffect(() => {
      const chainId = Object.keys(props.community?.addresses)[0];
      if (chainId && selectedToken === '') {
        setSelectedToken(networks[chainId].token);
      }
    }, [props.community]);

    /**
     * Wait for MetaMask plugin to initialize
     */
    function getWindowEthereum() {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        return window.ethereum;
      }
    }

    useEffect(() => {
      if (getWindowEthereum()) {
        if (!provider) {
          setProvider(new providers.Web3Provider(window.ethereum));
          console.log('Initialized MetaMask provider');
        }
      }
    }, [getWindowEthereum()]);

    /**
     * Connect MetaMask account
     */
    useEffect(() => {
      if (provider) {
        (async () => {
          let userAccount = (await provider.listAccounts())[0];
          // user not enabled for this app
          if (!userAccount) {
            try {
              userAccount = (await window.ethereum.enable())[0];
            } catch (error) {
              if (error.stack.includes('User denied account authorization')) {
                const msg = 'MetaMask not enabled. In order to donate PAN, you must authorize this app.';
                handleError(msg);
              }
            }
          } else if (userAccount === activeAccount) {
            console.log('MetaMask user account is already initialized: ', userAccount);
            return;
          }
          setActiveAccount(userAccount);
          console.log('Initialized MetaMask user account: ', userAccount);

          // Init MetaMask network change handler
          if (!metaMaskNetworkChangeHandler) {
            setMetaMaskNetworkChangeHandler(window.ethereum.on('chainChanged', async (network: string) => {
              setMetaMaskNetwork(parseInt(network, 16).toString());
            }));
            console.log('Initialized MetaMask network change handler');
          }
          const metaMaskChainId = (await provider.getNetwork()).chainId;
          setMetaMaskNetwork(metaMaskChainId.toString());
        })();
      }
    }, [provider]);

    /**
     * Listen for selected network changes
     */
    useEffect(() => {
      if (metaMaskNetwork !== '' && selectedNetwork !== '') {
        if (metaMaskNetwork !== selectedNetwork) {
          const errMsg = `Please connect MetaMask to the ${networks[selectedNetwork].name} network.`;
          handleError(errMsg);
        } else {
          clearError();
          const communityWalletAddress = props.community.addresses[selectedNetwork];
          if (communityWalletAddress) {
            console.log(`Setting ${props.community.name}'s community wallet address to ${communityWalletAddress} for network ${selectedNetwork}`);
            setCommunityWallet(communityWalletAddress);
          }
          if (provider) {
            (async () => {
              const contracts = await loadCommunityDonationContracts(provider);
              setFactory(contracts.factory);
              setRouter(contracts.router);
              setInputToken(contracts.paymentToken);
              if (typeof contracts.priceOracle !== 'undefined')
                setPriceOracle(contracts.priceOracle);
              console.log('Initialized contracts');
            })();
          }
        }
      }
    }, [metaMaskNetwork, selectedNetwork]);

    /**
     * Listen for selected token changes
     */
    useEffect(() => {
      setSelectedNetwork(mapTokenToChainId(selectedToken));
    }, [selectedToken]);
  
    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------
  
    function BN(small) {
      return BigNumber.from(small);
    }
    
    /**
     * Check token allowance
     */
    async function checkAllowance(token: Contract, ownerAddress: string, spenderAddress: string, numTokens: BigNumber) {
      const allowance = await token.allowance(ownerAddress, spenderAddress);
      return allowance.gte(numTokens);
    }
    
    /**
     * Fetch current ETH price
     */
    async function fetchEthPrice(chainId: string) {
      if (chainId) {
        if (chainId === NetworkEnums.XDAI) {
          const result = await fetch('https://blockscout.com/xdai/mainnet/api?module=stats&action=coinprice');
          const json = await result.json();
          return json.result.coin_usd;
        } else if (chainId === NetworkEnums.MATIC) {
          const priceData = await priceOracle?.latestRoundData();
          const lastPrice: BigNumber = priceData?.answer;
          if (lastPrice)
            return formatUnits(lastPrice, 8);
          else
            return '';
        } else if (chainId === NetworkEnums.MAINNET || chainId === NetworkEnums.RINKEBY) {
          const result = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot?currency=USD');
          const json = await result.json();
          return json.data.amount;
        }
      }
    }
    
    /**
     * Get path from payment token to PAN
     */
    async function getTokenPathByNetwork(chainId: string) {
      const path: string[] = [];

      if (router) {
        path.push(await router.WETH());
        
        if (chainId === NetworkEnums.XDAI)
          path.push(tokens[TokenEnums.HNY].addresses[chainId]);
        else if (chainId === NetworkEnums.MATIC)
          path.push(tokens[TokenEnums.USDC].addresses[chainId]);

        path.push(tokens[TokenEnums.PAN].addresses[chainId]);
      }

      return path;
    }

    // Clear error
    function clearError() {
      setError(false);
      setErrorMessage('');
    }

    function clearMessage() {
      setStep(null);
      setMessage('');
    }

    // Pass the error up to the caller and cancel everything
    function handleError(msg: string) {
      setErrorMessage(msg);
      setError(true);
      setStep(null);
      setMessage('');
      console.error(msg);
    }
  
    // Cancel the donation flow
    function handleCancel() {
      clearMessage();
    }

    /**
     * Map payment token to network
     */
    function mapTokenToChainId(token: string) {
      switch (token) {
        case TokenEnums.ETH: return NetworkEnums.MAINNET;
        case TokenEnums.XDAI: return NetworkEnums.XDAI;
        case TokenEnums.MATIC: return NetworkEnums.MATIC;
        default: return '';
      }
    }

    /**
     * Handle payment token change
     */
    async function handleChangePaymentToken(newToken: string): Promise<void> {
       setSelectedToken(newToken);
    }

    /**
     * Calculate Token -> USD
     */
    async function calculateTokenToFiat(tokenAmount: number, paymentToken: string): Promise<number> {
      if (tokenAmount === 0)
        return 0;
      
      const ethPrice = parseFloat(await fetchEthPrice(selectedNetwork));
      const fiatAmount = tokenAmount * ethPrice;
      console.log(`${tokenAmount} ${paymentToken} -> ${fiatAmount} USD`);
      
      return parseFloat(fiatAmount.toFixed(3));
    }

    /**
     * Calculate USD -> Token
     */
    async function calculateFiatToToken(fiatAmount: number, paymentToken: string): Promise<number> {
      if (fiatAmount === 0)
        return 0;

      const ethPrice = parseFloat(await fetchEthPrice(selectedNetwork));
      const tokenAmount = fiatAmount / ethPrice;
      console.log(`${fiatAmount} USD -> ${tokenAmount} ${paymentToken}`);

      return parseFloat(tokenAmount.toFixed(3));
    }

    /**
     * Purchase PAN with ETH through exchange
     */
    async function purchaseAndDonatePan(amountIn: BigNumber, provider: any): Promise<BigNumber> {      
      const { chainId } = await provider.getNetwork();
      const networkData = networks[chainId.toString()];
      
      if (!router || !inputToken || !router || !communityWallet)
        throw new Error('Contracts not initialized - canceling attempt to purchase PAN');
      
      try {
        const path: string[] = await getTokenPathByNetwork(selectedNetwork);
        const tokensOut = await router.getAmountsOut(amountIn, path);
        const amountOut: BigNumber = tokensOut[2];

        // if necessary, approve exchange to spend tokens
        if (selectedToken !== networkData.token) {
          const isAllowed: boolean = await checkAllowance(
            inputToken,
            activeAccount,
            router.address,
            amountIn,
          );
  
          console.log(`${networkData.exchange} is allowed to spend ${amountIn.toString()} ${inputToken}? `, isAllowed);
  
          if (!isAllowed) {
            setMessage('Approving tokens...');
  
            const approveTx = await inputToken.approve(
              router.address,
              amountIn,
            );
            console.log('Tokens have been approved', approveTx.hash);
          }
        }

        // the swaps set min out to 99.5% of the desired value
        const minAmountOut = parseFloat(amountOut.toString()) * 0.995;

        const block = await provider.getBlock(await provider.getBlockNumber());
        const deadline = BN(block.timestamp).add(3600); // add one hour
  
        setMessage('Purchasing PAN and sending to community wallet...');
        console.log(`Purchasing PAN from ${networkData.exchange} using ${selectedToken}!\n\ntokenAddress: ${inputToken.address}\n\namountOut: ${amountOut}\n\nminAmountOut: ${minAmountOut}\n\ndeadline: ${deadline}\n\ninputValue: ${amountIn}\n\ncommunityWallet: ${communityWallet}`);

        const tx = await router.swapExactETHForTokens(
          BN(minAmountOut.toString()),
          path,
          communityWallet,
          deadline,
          {
            value: amountIn,
          }
        );

        console.log('Purchase transaction:', tx);
  
        setMessage('Waiting for transaction confirmation...');
  
        // Wait for tx to get mined
        await provider.waitForTransaction(tx.hash);
  
        // TODO: maybe wait for blocks
  
        const receipt = await provider.getTransactionReceipt(tx.hash);
        console.log('receipt:', receipt);
  
        return amountOut;
      } catch (err) {
        console.error(`ERROR: ${err.data?.message}`);
        handleError(`${networkData.exchange} transaction failed: ${err.message}`);
        return BN('0');
      }
    }
  
    /**
     * Master donation handler
     */
    async function handleDonation(values: ICommunityDonationFormFields, actions: any) {
      // TODO: validate submitted data
      const { tokenAmount } = values;

      console.log('Starting donation flow...');

      if (!provider || !activeAccount) {
        console.log('No provider or active account!');
        return;
      }

      try {
        setStep('1');
        const amountIn = parseEther(tokenAmount.toString());
        const panPurchased = await purchaseAndDonatePan(amountIn, provider);
  
        if (panPurchased.gt('0') && step !== null) {
  
          setStep('2');
          setMessage('Donation complete!');
          console.log('Donation complete!');

          actions.resetForm();
        }
      } catch (err) {
        // let the caller handle errors
        console.error(`ERROR: ${err}`);
        handleError(err.message);
      }
    }
  
    const { ...passThroughProps } = props;
  
    return (
      <WrappedComponent
        initialValues={initialFormValues}
        onDonate={handleDonation}
        onCancel={handleCancel}
        onChangePaymentToken={handleChangePaymentToken}
        onChangeTokenAmount={calculateTokenToFiat}
        onChangeFiatAmount={calculateFiatToToken}
        step={step}
        message={message}
        activeAccount={activeAccount}
        errorMessage={errorMessage}
        errorPopupVisible={error}
        infoPopupVisible={!!step}
        infoPopupLoading={donationLoading}
        infoPopupSuccess={donationComplete}
        {...passThroughProps}
      />
    );
  };
};
