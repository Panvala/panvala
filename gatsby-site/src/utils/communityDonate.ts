import { utils } from 'ethers';

const { bigNumberify, parseUnits, formatEther, formatUnits } = utils;

// Types

export interface ICommunityDonationMetadata {
  paymentToken?: string;
  usdValue?: string;
  ethValue?: string;
}

// Base transaction info -- all required
export interface IDonationTx {
  txHash: string;
  sender: string;
  donor: string;
  tokens: string;
}

export enum TokenEnums {
  ETH = 'ETH',
  PAN = 'PAN',
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
export async function checkAllowance(token, owner, spender, numTokens) {
  const allowance = await token.functions.allowance(owner, spender);
  return allowance.gte(numTokens);
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
