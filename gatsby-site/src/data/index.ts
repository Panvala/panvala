import _exchanges from './exchanges.json';
import _networks from './networks.json';
import _tokens from './tokens.json';

export { default as fundraisers } from './fundraisers.json';

/**
 * Networks
 */
export interface INetworksData {
  [chainId: string]: {
    name: string;
    token: string;
    exchange: string;
    oracleAddress?: string;
  };
}
export enum NetworkEnums {
  MAINNET = '1',
  RINKEBY = '4',
  XDAI = '100',
  MATIC = '137',
}
export const networks: INetworksData = _networks;

/**
 * Donation Methods
 */
export enum DonationMethodEnums {
  GITCOIN = 'Gitcoin',
  GIVETH = 'Giveth',
}

/**
 * Tokens
 */
export interface ITokensData {
  [token: string]: {
    addresses: {
      [chainId: string]: string;
    };
  }
}
export enum TokenEnums {
  ETH = 'ETH',
  XDAI = 'XDAI',
  MATIC = 'MATIC',
  PAN = 'PAN',
  HNY = 'HNY',
  USDC = 'USDC',
}
export const tokens: ITokensData = _tokens;

/**
 * Exchanges
 */
export interface IExchangesData {
  [exchangeName: string]: {
    token: string;
    addresses: {
      factory: { [chainId: string]: string };
      router: { [chainId: string]: string };
    };
  };
}
export const exchanges: IExchangesData = _exchanges;

/**
 * Communities
 */
export interface ICommunityData {
  name: string;
  addresses: {
    [chainId: string]: string;
  };
}
