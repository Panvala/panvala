import React, { useEffect, useState } from 'react';
import { providers, utils } from 'ethers';
import { communities, networks } from '../../data';
import {
  BN,
  getGasPrice,
  quoteEthToPan,
  ICommunityDonationMetadata,
  fetchEthPrice,
  quoteUsdToEth,
  NetworkEnums,
  TokenEnums,
} from '../../utils/communityDonate';
import { loadCommunityContracts, getEnvironment, Environment } from '../../utils/env';

const { parseEther, getAddress, bigNumberify } = utils;

declare global {
  interface Window {
    ethereum: any;
  }
}

export const withCommunityDonationFlow = WrappedComponent => {
  return (props: any) => {
    // setting these via state causes component reloading and messes up the donation flow
    let provider: providers.Web3Provider;
    let activeAccount = '';
    let exchange: any;
    let token: any;
    let communityWallet: string = '';
    let panPurchased: utils.BigNumber;

    // TODO: fix the network error handling using react effects
    const [paymentNetwork, setPaymentNetwork] = useState<number>(NetworkEnums.XDAI);
    const [step, setStep] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');

    // TODO: use these
    // const [error, setError] = useState<boolean>(false);
    // const [errorMessage, setErrorMessage] = useState<string>('');

    // ---------------------------------------------------------------------------
    // Initialize
    // ---------------------------------------------------------------------------

    useEffect(() => {
      if (!communityWallet) {
        const address = communities[props.community].addresses.COMMUNITY_WALLET_ADDRESS;
        if (address) {
          communityWallet = address;
        }
      }
    }, [communityWallet]);
  
    useEffect(() => {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        // Listen for network changes -> reload page
        window.ethereum.on('networkChanged', network => {
          console.log('MetaMask network changed:', network);
          setPaymentNetwork(network);

          // NOTE: handling this reactively; will keep this here in the meantime
          // checkNetwork();
          // window.location.reload();
        });
      }
    });

    // Setup provider & selected account
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
  
    // Setup contracts
    async function setContracts(): Promise<void> {
      if (typeof provider !== 'undefined') {
        try {
          await checkNetwork();
        } catch (err) {
          console.error(`ERROR: ${err.message}`);
          throw err;
        }
  
        const contracts = await loadCommunityContracts(provider);
        token = contracts.token;
        exchange = contracts.exchange;
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
  
    // Check that provider & contracts are setup correctly
    async function checkEthereum(): Promise<string | void> {
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
  
      if (typeof token === 'undefined') {
        try {
          await setContracts();
        } catch (err) {
          console.error(`ERROR : ${err.message}`);
          handleError(err.message);
        }
        if (typeof token === 'undefined') {
          const errMsg = 'Contracts not set correctly.';
          handleError(errMsg);
        }
      }
    }
  
    async function checkNetwork(): Promise<void> {
      let errMsg: string;
      if (!activeAccount || !provider) {
        const account = await setSelectedAccount();
        if (!account) {
          handleError('Ethereum not setup properly.');
        }
      } else {
        const env = getEnvironment();

        const correctChainId: number = paymentNetwork ? paymentNetwork : env === Environment.production ? 1 : 4;

        const network = await provider.getNetwork();

        console.log(`User has selected the ${networks[correctChainId.toString()].name} network! Current MetaMask network: `, network.chainId);
    
        if (network.chainId != correctChainId) {
          errMsg = `Metamask is connected to an unsupported network. Please connect to the ${networks[correctChainId].name} network.`;
          handleError(errMsg);
        }
      }
    }
  
    async function connectWallet(): Promise<void> {
      await setSelectedAccount();
      await setContracts();
      await checkEthereum();
      console.log('Wallet was successfully connected! Provider: ', provider);
    }

    // Token > USD
    async function handleChangeTokenAmount(newTokenAmount: number, paymentToken?: string): Promise<number> {
      let tokenPrice = 0;
      let usdAmount = 0;

      if (paymentToken === TokenEnums.ETH) {
        tokenPrice = parseInt(await fetchEthPrice(), 10);
        usdAmount = newTokenAmount * tokenPrice;
        console.log(`${newTokenAmount} ${paymentToken} -> ${usdAmount} USD`);
      }
      
      return usdAmount;
    }

    // USD > Token
    async function handleChangeFiatAmount(newFiatAmount: number, paymentToken?: TokenEnums): Promise<number> {
      let tokenPrice = 0;
      let tokenAmount = 0;

      if (!newFiatAmount)
        return tokenAmount;

      if (paymentToken === TokenEnums.ETH) {
        tokenPrice = await fetchEthPrice();
        // Convert USD to ETH, print
        tokenAmount = quoteUsdToEth(newFiatAmount.toString(), tokenPrice.toString());
        console.log(`${newFiatAmount} USD -> ${tokenAmount} ${paymentToken}`);
      }

      return tokenAmount;
    }

    // TODO: fix this network error handling
    async function handleChangePaymentNetwork(newNetwork: NetworkEnums): Promise<void> {
      setPaymentNetwork(newNetwork);
    }

    useEffect(() => {
      console.log('Payment network changed - re-checking network');
      checkNetwork();
    }, [paymentNetwork])
  
    // PAN
    async function getQuote(value: utils.BigNumber) {
      return quoteEthToPan(value, provider, {
        token: token,
        exchange: exchange,
      });
    }

    async function createDonationMetadata(paymentToken: TokenEnums, fiatAmount: number) {
      const donationTotal: utils.BigNumber = BN(fiatAmount);
      
      // Get USD price of 1 ETH
      const ethPrice = await fetchEthPrice();
      
      // Convert USD to ETH, print
      const ethAmount = quoteUsdToEth(donationTotal, ethPrice).toString();
      console.log(`${donationTotal} USD -> ${ethAmount} ETH`);
      
      // Convert to wei, print
      const weiAmount = parseEther(ethAmount);
      const panValue = await getQuote(weiAmount);
      
      // PAN bought w/ 1 ETH
      await getQuote(parseEther('1'));
      console.log('[createDonationMetadata] 6');

      // Build donation object
      const donation: ICommunityDonationMetadata = {
        paymentToken,
        usdValue: donationTotal.toString(),
        ethValue: weiAmount.toString(),
      };

      return { metadata: donation, panValue };
    }
  
    // Sell ETH -> uniswap exchange (buy PAN)
    async function purchasePan(donation: ICommunityDonationMetadata, panValue: utils.BigNumber): Promise<utils.BigNumber> {
      // TODO: subtract a percentage
      let minTokens = BN(panValue).sub(5000);
      if (minTokens.lt(0))
        minTokens = BN(0);

      const block = await provider.getBlock(await (provider.getBlockNumber()));
      const deadline = BN(block.timestamp).add(3600); // add one hour

      const { chainId } = await provider.getNetwork();
      const network = networks[chainId.toString()];

      // Buy Pan with Eth
      try {

        setMessage(`Purchasing PAN from ${network.exchangeName}...`);
  
        const gasPrice = await getGasPrice();
        const ethValue = BN(donation.ethValue);

        console.log(`Purchasing PAN from ${network.exchangeName}!\n\nminTokens: ${minTokens}\ndeadline: ${deadline}\ngasPrice: ${gasPrice}\nethValue: ${ethValue}\ncommunityWallet: ${communityWallet}`);

        const tx = await exchange.functions.swapExactETHForTokens(
          minTokens,
          [
            network.addresses.WETH_TOKEN_ADDRESS,
            network.addresses.PAN_TOKEN_ADDRESS,
          ],
          communityWallet,
          deadline
        );
  
        console.log('tx:', tx);
  
        setMessage('Waiting for transaction confirmation...');
  
        // Wait for tx to get mined
        await provider.waitForTransaction(tx.hash);
  
        // TODO: maybe wait for blocks
  
        const receipt = await provider.getTransactionReceipt(tx.hash);
        console.log('receipt:', receipt);
        console.log();
  
        // Get new quote
        console.log('NEW QUOTE');
        await getQuote(ethValue);
        await getQuote(parseEther('1'));
        return panValue;
      } catch (err) {
        console.error(`ERROR: ${err.message}`);
        handleError(`${network.exchangeName} transaction failed: ${err.message}`);
        return bigNumberify('0');
      }
    }
  
    // Pass the error up to the caller and cancel everything
    function handleError(msg: string) {
      // TODO: use these error flags/messages
      // setErrorMessage(msg);
      // setError(true);
      setStep(null);
      setMessage('');
      console.error(msg);
      throw new Error(msg);
    }
  
    // Cancel the donation flow
    function handleCancel() {
      setStep(null);
      setMessage('');
    }

    // Execute the donation flow, throwing on error
    async function handleDonation(data: any, actions: any) {
      // TODO: validate submitted data

      const { donationMetadata } = data;

      try {
        /// 1. Connect purchase PAN
        setStep('1');
        setMessage('');

        await connectWallet();

        const { paymentToken, fiatAmount, } = donationMetadata;
        const { metadata, panValue } = await createDonationMetadata(paymentToken, fiatAmount);
    
        // Purchase Panvala pan
        panPurchased = await purchasePan(metadata, panValue);
  
        /// 2. Approve if necessary and donate PAN
        if (panPurchased.gt('0') && step != null) {
          setStep('2');
          setMessage('');
  
          // Donate Panvala pan
          // await donatePanToCommunity(panPurchased);

          setStep('3');
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
        onDonate={handleDonation}
        onCancel={handleCancel}
        onChangePaymentNetwork={handleChangePaymentNetwork}
        onChangeTokenAmount={handleChangeTokenAmount}
        onChangeFiatAmount={handleChangeFiatAmount}
        connectWallet={connectWallet}
        message={message}
        step={step}
        {...passThroughProps}
      />
    );
  };
};
