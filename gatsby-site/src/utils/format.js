import { BigNumber, utils } from 'ethers';
import orderBy from 'lodash/orderBy';
import { DonationMethodEnums, NetworkEnums, TokenEnums } from '../data';
import { Environment, getEnvironment } from './env';

export function sliceDecimals(floatingPt, decimalDigits = 3) {
  const point = floatingPt.indexOf('.');
  if (point === -1) {
    return floatingPt;
  }
  const integer = floatingPt.slice(0, point);
  const fractional = floatingPt.slice(point, point + decimalDigits);
  return integer + fractional;
}

function mapDatesToText(date, epochNumber) {
  const datesToText = {
    epochNumber: 'Epoch Number',
    epochStart: `Epoch ${epochNumber} Starts`,
    proposalSubmissionOpens: `Batch ${epochNumber + 1} Proposal Submission Opens`,
    proposalSubmissionCloses: `Batch ${epochNumber + 1} Proposal Submission Closes`,
    slateCreationOpens: `Batch ${epochNumber + 1} Slate Creation Opens`,
    slateCreationCloses: `Batch ${epochNumber + 1} Slate Creation Closes`,
    votingOpens: 'Voting Window Opens',
    votingCloses: 'Voting Window Closes',
    votingConcludes: `Voting Concludes`,
    nextEpochStart: `Batch ${epochNumber + 1} Tokens Released`,
  };
  return datesToText[date];
}

export function formatDates(epochDates) {
  // Get current UTS
  const nowDate = BigNumber.from(Date.now())
    .div(1000)
    .toNumber();

  // Transform into human readable dates
  const dates = Object.keys(epochDates).reduce((acc, val) => {
    const skippedDates = [
      'epochNumber',
      'proposalSubmissionOpens',
      'epochStart',
      'votingOpens',
      'votingCloses',
      'votingConcludes',
    ];
    // Skip dates
    if (skippedDates.includes(val)) {
      return acc;
    }
    return [
      ...acc,
      {
        date: epochDates[val],
        eventName: mapDatesToText(val, epochDates.epochNumber),
        eventDescription: '', // TODO: map events to descriptions
        nextEvent: false,
        expired: epochDates[val] < nowDate,
      },
    ];
  }, []);
  // console.log('dates:', dates);

  // Order dates by chronology
  return orderBy(dates, 'date');
}

export function toUSDCents(dollars) {
  if (dollars.includes('.')) {
    throw new Error('Dollar value must be an integer');
  }
  const numDollars = parseInt(dollars);
  return (numDollars * 100).toString();
}

export function prettify(ugly) {
  // TEMPORARY until typescript refactor
  if (typeof ugly === 'string') {
    return utils.commify(sliceDecimals(ugly));
  }
  return ugly;
}

/* Convert to camelCase */
export const toCamelCase = (input) => {
  const word = input.replace(/[' ']/g, '');
  return word[0].toLowerCase() + word.slice(1);
};

/* Convert to kebab-case */
export const toKebabCase = (input) => input.replace(/[' ']/g, '-').toLowerCase();

/* Shorten a string */
export const shortenString = (input, sliceSize = 4) => `${input.slice(0, 2 + sliceSize)}...${input.slice(input.length - sliceSize, input.length)}`;

export const getSwapUrl = (network, address) => {
  switch (network) {
    case NetworkEnums.MAINNET: return `https://app.uniswap.org/#/swap?outputCurrency=${address}`
    case NetworkEnums.RINKEBY: return `https://app.uniswap.org/#/swap?outputCurrency=${address}`
    case NetworkEnums.XDAI: return `https://app.honeyswap.org/#/swap?outputCurrency=${address}`
    case NetworkEnums.MATIC: return `https://quickswap.exchange/#/swap?outputCurrency=${address}`
    default: return '';
  }
};

/* Get blockchain explorer URL based on network */
export const getExplorerUrl = (paymentToken, address) => {
  switch (paymentToken) {
    case TokenEnums.ETH: return `https://etherscan.io/address/${address}`;
    case TokenEnums.PAN: return `https://etherscan.io/address/${address}`;
    case TokenEnums.XDAI: return `https://blockscout.com/poa/xdai/address/${address}`;
    case TokenEnums.MATIC: return `https://explorer-mainnet.maticvigil.com/address/${address}`;
    default: return '';
  }
};

/* Map payment token to network */
export const mapTokenToChainId = (token) => {
  switch (token) {
    case TokenEnums.ETH: return NetworkEnums.MAINNET;
    case TokenEnums.PAN: return NetworkEnums.MAINNET;
    case TokenEnums.XDAI: return NetworkEnums.XDAI;
    case TokenEnums.MATIC: return NetworkEnums.MATIC;
    default: return '';
  }
};

export const mapDonationMethodToEnum = (donationMethod) => {
  const testString = donationMethod.toLowerCase();
  if ((/gitcoin/g).test(testString))
    return DonationMethodEnums.GITCOIN;
  else if ((/giveth/g).test(testString))
    return DonationMethodEnums.GIVETH;
  return '';
};

export const mapLayer2ToNetworkEnum = (preference) => {
  const testString = preference.toLowerCase();
  if ((/xdai/g).test(testString))
    return NetworkEnums.XDAI;
  else if ((/matic/g).test(testString))
    return NetworkEnums.MATIC;
  return '';
};

/**
 * Get Panvala API endpoint
 */
export const getAPIEndpoint = (method, account, pollID) => {
  const environment = getEnvironment();
  const apiHost =
    environment === Environment.production
      ? 'https://api.panvala.com'
      : environment === Environment.staging
      ? 'https://staging-api.panvala.com'
      : 'http://localhost:5001';

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': apiHost,
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type',
  };
  if (method === 'POST') {
    return { endpoint: `${apiHost}/api/polls/${pollID}`, headers };
  } else {
    return { endpoint: `${apiHost}/api/polls/${pollID}/status/${account}`, headers };
  }
};
