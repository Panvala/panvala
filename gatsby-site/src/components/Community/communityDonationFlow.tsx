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
import { loadCommunityDonationContracts, getEnvironment, Environment } from '../../utils/env';

const { formatUnits, parseEther, getAddress } = utils;

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

    let provider: providers.Web3Provider;

    const [activeAccount, setActiveAccount] = useState<string>('');
    const [factory, setFactory] = useState<Contract>();
    const [router, setRouter] = useState<Contract>();
    const [inputToken, setInputToken] = useState<Contract>();
    const [priceOracle, setPriceOracle] = useState<Contract>();
    const [communityWallet, setCommunityWallet] = useState<string>('');
    const [selectedToken, setSelectedToken] = useState<string>(initialFormValues.paymentToken);
    const [selectedNetwork, setSelectedNetwork] = useState<string>(mapTokenToChainId(initialFormValues.paymentToken));
    
    // TODO: use these
    const [step, setStep] = useState<string | null>(null);
    const [donationLoading, setDonationLoading] = useState<boolean>(false);
    const [donationComplete, setDonationComplete] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // ---------------------------------------------------------------------------
    // React Effects
    // ---------------------------------------------------------------------------

    /**
     * Set selected token to first in the list
     */
    // useEffect(() => {
    //   const chainId = Object.keys(props.community?.addresses)[0];
    //   if (chainId) {
    //     if (selectedToken === '')
    //       setSelectedToken(networks[chainId].token);
    //     if (selectedNetwork === '')
    //       setSelectedNetwork(chainId);
    //   }
    // }, [props.community]);

    /**
     * Listen for MetaMask network changes
     */
    // useEffect(() => {
    //   if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    //     window.ethereum.on('chainChanged', async network => {
    //       console.log(`MetaMask network has changed to ${network} - re-checking network`);
    //       await handleNetworkChange();
    //     });
    //   }
    // });

    /**
     * Listen for selected network changes
     */
    useEffect(() => {
      console.log(`Selected payment network has changed to ${selectedNetwork} - re-checking MetaMask network`);
      handleNetworkChange();
    }, [selectedNetwork]);

    /**
     * Listen for selected token changes
     */
    useEffect(() => {
      console.log(`Selected payment token has changed to ${selectedToken} - re-checking MetaMask network`);
      setSelectedNetwork(mapTokenToChainId(selectedToken));
    }, [selectedToken]);

    // ---------------------------------------------------------------------------
    // Initialization
    // ---------------------------------------------------------------------------  

    /**
     * Handle network changes
     */
    async function handleNetworkChange() {
      if (selectedNetwork !== '') {
        await setContracts();
        if (selectedNetwork !== '' && communityWallet === '') {
          const address = props.community.addresses[selectedNetwork];
          if (address) {
            console.log(`Setting ${props.community.name}'s community wallet address to ${address} for network ${selectedNetwork}`);
            setCommunityWallet(address);
          }
        }
      }
    }

    /**
     * Initialize Provider and get active account
     */
    async function setSelectedAccount(): Promise<string | void> {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        if (!provider) {
          provider = new providers.Web3Provider(window.ethereum);
        }
        let selectedAccount = (await provider.listAccounts())[0];
        // user not enabled for this app
        if (!selectedAccount) {
          try {
            selectedAccount = (await window.ethereum.enable())[0];
          } catch (error) {
            if (error.stack.includes('User denied account authorization')) {
              const msg =
                'MetaMask not enabled. In order to donate pan, you must authorize this app.';
              handleError(msg);
            }
          }
        }
        setActiveAccount(selectedAccount);
        return selectedAccount;
      } else {
        handleError('MetaMask not found. Please download MetaMask @ metamask.io');
      }
    }
  
    /**
     * Set Contracts
     */
    async function setContracts(): Promise<void> {
      if (typeof provider !== 'undefined') {
        try {
          await checkNetwork();
        } catch (err) {
          console.error(`ERROR: ${err.message}`);
          throw err;
        }

        const contracts = await loadCommunityDonationContracts(provider);
        setFactory(contracts.factory);
        setRouter(contracts.router);
        setInputToken(contracts.paymentToken);
        if (typeof contracts.priceOracle !== 'undefined')
          setPriceOracle(contracts.priceOracle);
      } else {
        // No provider yet
        const account = await setSelectedAccount();
        if (account) {
          await setContracts();
        } else {
          // Invalid provider / provider not enabled for this site
          const msg = 'You must login to MetaMask';
          console.error(msg);
          throw new Error(msg);
        }
      }
    }
  
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
          const result = await fetch('https://blockscout.com/xdai/mainnet/api?module=stats&action=ethprice');
          const json = await result.json();
          return json.result.ethusd;
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
    async function getPathByNetwork(chainId: string) {
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

    // Pass the error up to the caller and cancel everything
    function handleError(msg: string) {
      setErrorMessage(msg);
      setError(true);
      setStep(null);
      setMessage('');
      console.error(msg);
      throw new Error(msg);
      // alert(msg);
    }
  
    // Cancel the donation flow
    function handleCancel() {
      setStep(null);
      setMessage('');
    }

    /**
     * Validate Providers and Contracts are set up properly
     */
    async function checkEthereum(): Promise<string | void> {
      // Verify provider and account
      let account;
      try {
        account = getAddress(activeAccount);
      } catch {
        account = await setSelectedAccount();
        if (!account) {
          const errMsg = 'You must be logged into MetaMask.';
          handleError(errMsg);
        }
      }
  
      // Verify exchange factory
      if (typeof factory === 'undefined') {
        try {
          await setContracts();
        } catch (err) {
          console.error(`ERROR : ${err.message}`);
          handleError(err.message);
        }
        if (typeof factory === 'undefined') {
          const errMsg = 'Factory contract not set correctly.';
          handleError(errMsg);
        }
      }

      // Verify exchange router
      if (typeof router === 'undefined') {
        try {
          await setContracts();
        } catch (err) {
          console.error(`ERROR : ${err.message}`);
          handleError(err.message);
        }
        if (typeof router === 'undefined') {
          const errMsg = 'Router contract not set correctly.';
          handleError(errMsg);
        }
      }
    }
  
    /**
     * Validate MetaMask is connected to the correct network
     */
    async function checkNetwork(): Promise<void> {
      let errMsg: string;
      if (!activeAccount || !provider) {
        const account = await setSelectedAccount();
        if (!account) {
          handleError('Could not get user account - Ethereum not setup properly.');
        }
      }
      const env = getEnvironment();
      let correctChainId: string = selectedNetwork;
      if (correctChainId === NetworkEnums.MAINNET)
        correctChainId = env === Environment.production
          ? NetworkEnums.MAINNET
          : NetworkEnums.RINKEBY;

      const network: providers.Network = await provider.getNetwork();

      console.log(`User has selected the ${networks[correctChainId].name} network! Current MetaMask network: `, network.chainId);
  
      if (network.chainId.toString() !== correctChainId) {
        errMsg = `Metamask is connected to an unsupported network. Please connect to the ${networks[correctChainId].name} network.`;
        handleError(errMsg);
      }
    }
  
    /**
     * Connect a user's wallet and validate
     */
    async function connectWallet(): Promise<void> {
      console.log('Connecting user wallet...');
      await setSelectedAccount();
      await setContracts();
      await checkEthereum();
      console.log('Wallet was successfully connected! Provider: ', provider);
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
    async function purchaseAndDonatePan(amountIn: BigNumber): Promise<BigNumber> {      
      const { chainId } = await provider.getNetwork();
      const networkData = networks[chainId.toString()];
      
      if (!router || !inputToken || !router)
        throw new Error('Contracts not initialized - canceling attempt to purchase PAN');
      
      try {
        const path: string[] = await getPathByNetwork(selectedNetwork);
        const tokensOut = await router.getAmountsOut(amountIn, path);
        const amountOut: BigNumber = tokensOut[2];

        // Check allowance
        const isAllowed: boolean = await checkAllowance(
          inputToken,
          activeAccount,
          router.address,
          amountIn,
        );

        console.log(`${networkData.exchange} Router at ${router.address} is allowed to spend ${amountIn.toString()} tokens? `, isAllowed);

        // if necessary, approve exchange to spend tokens
        if (!isAllowed) {
          setMessage('Approving tokens...');

          const approveTx = await inputToken.approve(
            router.address,
            amountIn,
          );
          console.log('Tokens have been approved', approveTx.hash);
        }

        // the swaps set min out to 99.5% of the desired value
        const minAmountOut = parseFloat(amountOut.toString()) * 0.995;

        const block = await provider.getBlock(await provider.getBlockNumber());
        const deadline = BN(block.timestamp).add(3600); // add one hour
  
        setMessage('Purchasing PAN and sending to community wallet...');
        console.log(`Purchasing PAN from ${networkData.exchange} using ${selectedToken}!\n\ntokenAddress: ${inputToken.address}\n\namountOut: ${amountOut}\n\nminAmountOut: ${minAmountOut}\n\ndeadline: ${deadline}\n\ninputValue: ${amountIn}\n\ncommunityWallet: ${communityWallet}`);

        // const tx = await router.swapExactETHForTokens(
        //   BN(minAmountOut.toString()),
        //   path,
        //   communityWallet,
        //   deadline,
        //   {
        //     value: amountIn,
        //   }
        // );

        const tx = { hash: '' };

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

      try {
        setStep('1');
        setMessage('Connecting wallet...');

        if (!provider || !activeAccount)
          await connectWallet();

        setStep('2');
        const amountIn = parseEther(tokenAmount.toString());
        const panPurchased = await purchaseAndDonatePan(amountIn);
  
        if (panPurchased.gt('0') && step !== null) {
  
          setStep('3');
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
