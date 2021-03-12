import React, { useEffect, useState } from 'react';
import { constants, Contract, providers, utils } from 'ethers';
import {
  BN,
  getGasPrice,
  quoteEthToPan,
  fetchEthPrice,
  quoteUsdToEth,
  NetworkEnums,
  ICommunitiesData,
  INetworksData,
  ITokensData,
  TokenEnums,
  getTokenPairAddress,
  checkAllowance,
} from '../../utils/communityDonate';
import { ICommunityDonationFormFields } from './CommunityDonationForm';
import { loadCommunityDonationContracts, getEnvironment, Environment } from '../../utils/env';
// import { exchangeAbi, tcAbi, tokenAbi, IUniswapV2Factory, IUniswapV2Router02 } from '../../utils/abis';

const { parseEther, formatEther, formatUnits, getAddress, bigNumberify } = utils;

declare global {
  interface Window {
    ethereum: any;
  }
}

interface ICommunityDonationFlowProps {
  data: {
    communities: ICommunitiesData;
    tokens: ITokensData;
    networks: INetworksData;
  };
  [key: string]: any;
}

export const withCommunityDonationFlow = WrappedComponent => {
  return (props: ICommunityDonationFlowProps) => {
    const { communities, tokens, networks } = props.data;

    const initialFormValues: ICommunityDonationFormFields = {
      firstName: '',
      lastName: '',
      email: '',
      paymentToken: TokenEnums.XDAI,
      tokenAmount: 0,
      fiatAmount: 0,
    };

    // don't want to trigger component reloads in the middle of the donation flow
    let provider: providers.Web3Provider;
    let activeAccount = '';
    let panPurchased: utils.BigNumber;

    const [factory, setFactory] = useState<Contract>();
    const [router, setRouter] = useState<Contract>();
    const [inputToken, setInputToken] = useState<Contract>();
    const [panToken, setPanToken] = useState<Contract>();
    const [wethToken, setWethToken] = useState<Contract>();

    const [communityWallet, setCommunityWallet] = useState<string>('');
    const [selectedToken, setSelectedToken] = useState<string>(initialFormValues.paymentToken);
    const [selectedNetwork, setSelectedNetwork] = useState<string>(mapTokenToChainId(initialFormValues.paymentToken));
    const [step, setStep] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');

    // TODO: use these
    // const [error, setError] = useState<boolean>(false);
    // const [errorMessage, setErrorMessage] = useState<string>('');

    // ---------------------------------------------------------------------------
    // React Effects
    // ---------------------------------------------------------------------------

    /**
     * Listen for MetaMask network changes
     */
    useEffect(() => {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        window.ethereum.on('networkChanged', async network => {
          console.log(`MetaMask network has changed to ${network} - re-checking network`);
          await handleNetworkChange();
        });
      }
    });

    /**
     * Listen for selected network changes
     */
    useEffect(() => {
      console.log(`Selected payment network has changed to ${selectedNetwork} - re-checking network`);
      handleNetworkChange();
    }, [selectedNetwork]);

    /**
     * Listen for selected token changes
     */
    useEffect(() => {
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
          const address = communities[props.community]?.walletAddresses[selectedNetwork];
          if (address) {
            console.log('Setting community wallet address to: ', address);
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
        activeAccount = selectedAccount;
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
        setInputToken(contracts.inputToken);
        setPanToken(contracts.panToken);
        setWethToken(contracts.wethToken);
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
  
    // Pass the error up to the caller and cancel everything
    function handleError(msg: string) {
      // TODO: use these error flags/messages
      // setErrorMessage(msg);
      // setError(true);
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

      const network: utils.Network = await provider.getNetwork();

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
    async function calculateTokenToFiat(newTokenAmount: number, paymentToken?: string): Promise<number> {
      let fiatAmount = 0;
      
      if (!newTokenAmount)
        return fiatAmount;
      
      let tokenAmount = newTokenAmount;

      // get ETH value of input tokens
      if (paymentToken !== TokenEnums.ETH && router && factory && inputToken && wethToken) {
        const donationTotal = parseEther(newTokenAmount.toString());
        const tokensOut = await router?.getAmountsOut(donationTotal, [
          inputToken.address,
          tokens[TokenEnums.WETH].addresses[selectedNetwork],
        ]);
        const wethValue = formatUnits(tokensOut[1], 18);
        tokenAmount = parseFloat(wethValue);
      }

      // get ETH price and convert to USD
      const ethPrice = parseInt(await fetchEthPrice(), 10);
      fiatAmount = tokenAmount * ethPrice;
      console.log(`${newTokenAmount} ${paymentToken} -> ${fiatAmount.toFixed(3)} USD`);
      
      return parseFloat(fiatAmount.toFixed(3));
    }

    /**
     * Calculate USD -> Token
     */
    async function calculateFiatToToken(newFiatAmount: number, paymentToken?: string): Promise<number> {
      let tokenAmount = 0;
      
      if (!newFiatAmount)
        return tokenAmount;
      
      const ethPrice = await fetchEthPrice();
      const ethAmount = quoteUsdToEth(BN(newFiatAmount), ethPrice).toFixed(18);
      tokenAmount = parseFloat(ethAmount);
      console.log(`${newFiatAmount} USD -> ${ethAmount} ETH`);

      if (paymentToken !== TokenEnums.ETH && router && factory && inputToken && wethToken) {
        const weiAmountOut = parseEther(ethAmount);
        const tokensIn = await router?.getAmountsIn(weiAmountOut, [
          tokens[selectedToken].addresses[selectedNetwork],
          tokens[TokenEnums.WETH].addresses[selectedNetwork],
        ]);
        const tokenValue = formatUnits(tokensIn[0], 18);
        tokenAmount = parseFloat(tokenValue);
        console.log(`${ethAmount} ETH -> ${tokenAmount} ${paymentToken}`);
      }

      return parseFloat(tokenAmount.toFixed(3));
    }

    /**
     * Purchase PAN with ETH through exchange
     */
    async function purchasePan(amountIn: utils.BigNumber, path: string[]): Promise<utils.BigNumber> {      
      const { chainId } = await provider.getNetwork();
      const networkData = networks[chainId.toString()];
      console.log('1');
      
      if (!router || !inputToken)
        throw new Error('Contracts not initialized - canceling attempt to purchase PAN');
      
      try {
        const tokensOut = await router?.getAmountsOut(amountIn, path);
        const panValue: number = tokensOut[2];
        const amountOut = BN(panValue);

        // TODO: replace with percentage
        let minAmountOut = amountOut.sub(5000);

        console.log('PAN to purchase: ', formatUnits(amountOut.toString(), 18));

        const currentBlock = await provider.getBlockNumber();
        const block = await provider.getBlock(currentBlock);
        const deadline = BN(block.timestamp).add(3600); // add one hour

        setMessage(`Purchasing PAN from ${networkData.exchange}...`);
  
        console.log(`Purchasing PAN from ${networkData.exchange}!\n\nminAmountOut: ${minAmountOut}\ndeadline: ${deadline}\ninputValue: ${amountIn}\ncommunityWallet: ${communityWallet}`);

        // Check allowance
        const isAllowed: boolean = await checkAllowance(
          inputToken,
          activeAccount,
          router.address,
          panValue,
        );

        console.log(`${networkData.exchange} Router at ${router.address} is allowed to spend tokens? `, isAllowed);

        // if necessary, approve exchange to spend tokens
        if (!isAllowed) {
          setMessage('Approving tokens...');

          const approveTx = await inputToken.approve(
            router.address,
            amountOut,
          );
          console.log('Tokens have been approved', approveTx.hash);
        }

        const tx = await router?.swapExactTokensForTokens(
          amountIn,
          minAmountOut,
          path,
          communityWallet,
          deadline,
        );
  
        console.log('tx:', tx);
  
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
        return bigNumberify('0');
      }
    }
  
    /**
     * Master donation handler
     */
    async function handleDonation(values: ICommunityDonationFormFields, actions: any) {
      // TODO: validate submitted data
      const { tokenAmount } = values;

      try {
        // Connect wallets
        setStep('1');
        setMessage('Connecting wallet...');

        if (!provider || !activeAccount) {
          await connectWallet();
        }

        // Convert donation to wei
        const donationTotal = parseEther(tokenAmount.toString());

        console.log(`Donation total: ${formatUnits(donationTotal.toString(), 18)} ${selectedToken}`);

        const path: string[] = [
          tokens[selectedToken].addresses[selectedNetwork],
          tokens[TokenEnums.HNY].addresses[selectedNetwork],
          tokens[TokenEnums.PAN].addresses[selectedNetwork],
        ];

        // Purchase Panvala pan
        setStep('2');
        panPurchased = await purchasePan(donationTotal, path);
  
        // 2. Approve if necessary and donate PAN
        if (panPurchased.gt('0') && step != null) {
          setStep('3');
          setMessage('Sending PAN to community wallet...');
  
          // Donate Panvala pan
          // await donatePanToCommunity(panPurchased);

          setStep('4');
          setMessage('Donation complete!');

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
        connectWallet={connectWallet}
        message={message}
        step={step}
        {...passThroughProps}
      />
    );
  };
};
