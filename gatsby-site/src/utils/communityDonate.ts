import { Contract, providers, utils } from 'ethers';
import { tokens } from '../data';

const { bigNumberify, parseUnits, formatEther, formatUnits } = utils;

// Types

export interface INetworksData {
  [chainId: string]: {
    name: string;
    token: string;
    exchange: string;
  };
}

export interface ITokensData {
  [token: string]: {
    addresses: {
      [chainId: string]: string;
    };
  }
}

export interface ICommunitiesData {
  [communityId: string]: {
    name: string;
    city: string;
    state: string;
    walletAddresses: {
      [chainId: string]: string;
    };
  };
}

export interface IExchangesData {
  [exchangeName: string]: {
    token: string;
    addresses: {
      factory: { [chainId: string]: string };
      router: { [chainId: string]: string };
    };
  };
}

export enum TokenEnums {
  ETH = 'ETH',
  WETH = 'WETH',
  PAN = 'PAN',
  XDAI = 'XDAI',
  STAKE = 'STAKE',
  HNY = 'HNY',
  MATIC = 'MATIC',
  USDC = 'USDC',
}

export enum NetworkEnums {
  MAINNET = '1',
  RINKEBY = '4',
  XDAI = '100',
  MATIC = '137',
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function BN(small) {
  return bigNumberify(small);
}

/**
 * Check token allowance
 */
export async function checkAllowance(token: Contract, ownerAddress: string, spenderAddress: string, numTokens: number) {
  const allowance = await token.allowance(ownerAddress, spenderAddress);
  return allowance.gte(numTokens);
}

/**
 * Get token pair address
 */
export async function getTokenPairAddress(factory: Contract, tokenInAddress: string, tokenOutAddress: string): Promise<string> {
  return await factory.getPair(tokenInAddress, tokenOutAddress);
}

/**
 * Fetch current ETH price
 */
export async function fetchEthPrice() {
  const result = await fetch('https://api.coinbase.com/v2/prices/ETH-USD/spot?currency=USD');
  const json = await result.json();
  const ethPrice = json.data.amount;
  return ethPrice;
}

/**
 * Convert USD value -> ETH
 */
export function quoteUsdToEth(pledgeTotalUSD, ethPrice) {
  return parseInt(pledgeTotalUSD, 10) / parseInt(ethPrice, 10);
}

/**
 * Get current gas price
 */
export async function getGasPrice(speed = 'fast') {
  const res = await fetch('https://ethgasstation.info/json/ethgasAPI.json');
  const gasPrices = await res.json();
  console.log('gasPrices:', gasPrices);
  let gasPrice;
  if (gasPrices && gasPrices.hasOwnProperty(speed)) {
    gasPrice = parseUnits((gasPrices[speed] / 10).toString(), 'gwei');
  } else if (gasPrices && gasPrices.hasOwnProperty('fast')) {
    gasPrice = parseUnits((gasPrices.fast / 10).toString(), 'gwei');
  } else {
    gasPrice = parseUnits('12', 'gwei');
  }
  return gasPrice.toHexString();
}

/**
 * Convert ETH value -> PAN
 */
export async function quoteEthToPan(etherToSpend: utils.BigNumber, provider, { token, exchange }) {

  // Sell ETH for PAN
  const ethAmount = BN(etherToSpend);
  
  // ETH reserve
  const inputReserve = await provider.getBalance(exchange.address);
  console.log(`ETH reserve: ${formatEther(inputReserve)}`);

  // PAN reserve
  const outputReserve = await token.balanceOf(exchange.address);
  console.log(`PAN reserve: ${formatUnits(outputReserve, 18)}`);

  const numerator = ethAmount.mul(outputReserve).mul(997);
  const denominator = inputReserve.mul(1000).add(ethAmount.mul(997));
  const panToReceive = numerator.div(denominator);

  console.log(
    `Quote ${formatEther(ethAmount)} ETH -> ${formatUnits(panToReceive.toString(), 18)} PAN`
  );
  // EQUIVALENT, DIRECT CHAIN CALL
  // PAN bought w/ input ETH
  // const panToReceive = await exchange.getEthToTokenInputPrice(ethAmount);
  // console.log(`${formatEther(ethAmount)} ETH -> ${formatUnits(panToReceive, 18)} PAN`);
  return panToReceive;
}
