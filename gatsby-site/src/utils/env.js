import { Contract } from 'ethers';
import { exchangeAbi, exchangeV2Abi, tcAbi, tokenAbi } from './abis';
import { networks } from '../data';

export const Environment = {
  staging: 'staging',
  development: 'development',
  production: 'production',
};

/**
 * Determine the environment (production, staging, development) using the URL
 * TODO: use environment variables
 */
export function getEnvironment() {
  const urlRoute = window.location.href;

  const isStaging = urlRoute.includes('staging/donate') || urlRoute.includes('develop.panvala.com');

  const environment = isStaging
    ? Environment.staging
    : urlRoute.includes('localhost')
    ? Environment.development
    : Environment.production;

  return environment;
}

export async function loadCommunityContracts(provider) {
  const { chainId } = await provider.getNetwork();
  const signer = provider.getSigner();
  
  const network = networks[chainId.toString()];
  console.log('[loadCommunityContracts] network: ', network);

  if (!network)
    throw new Error('MetaMask is not connected.');

  // Addresses
  const tokenAddress = network.addresses.PAN_TOKEN_ADDRESS;
  const exchangeAddress = network.addresses.EXCHANGE_ADDRESS;

  // Get codes
  const tokenCode = await provider.getCode(tokenAddress);
  const exchangeCode = await provider.getCode(exchangeAddress);

  // prettier-ignore
  if (!tokenAddress || !exchangeAddress || !tokenCode || !exchangeCode) {
    throw new Error('Invalid address or no code at address.')
  }

  // Init token, token capacitor, uniswap exchange contracts
  const token = new Contract(tokenAddress, tokenAbi, signer);
  const exchange = new Contract(exchangeAddress, exchangeV2Abi, signer);

  return {
    token,
    exchange,
  };
}

export async function loadContracts(provider) {
  const { chainId } = await provider.getNetwork();
  const signer = provider.getSigner();

  // Addresses
  const tokenAddress =
    chainId === 4
      ? '0x4912d6aBc68e4F02d1FdD6B79ed045C0A0BAf772'
      : chainId === 1 && '0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44';
  const tcAddress =
    chainId === 4
      ? '0xA062C59F42a45f228BEBB6e7234Ed1ea14398dE7'
      : chainId === 1 && '0x9a7B675619d3633304134155c6c976E9b4c1cfB3';
  const exchangeAddress =
    chainId === 4
      ? '0x25EAd1E8e3a9C38321488BC5417c999E622e36ea'
      : chainId === 1 && '0xF53bBFBff01c50F2D42D542b09637DcA97935fF7';

  // Get codes
  const tokenCode = await provider.getCode(tokenAddress);
  const tcCode = await provider.getCode(tcAddress);
  const exchangeCode = await provider.getCode(exchangeAddress);

  // prettier-ignore
  if (!tokenAddress || !tcAddress || !exchangeAddress || !tokenCode || !tcCode || !exchangeCode) {
        throw new Error('Invalid address or no code at address.')
      }

  // Init token, token capacitor, uniswap exchange contracts
  const token = new Contract(tokenAddress, tokenAbi, signer);
  const tokenCapacitor = new Contract(tcAddress, tcAbi, signer);
  const exchange = new Contract(exchangeAddress, exchangeAbi, signer);

  return {
    token,
    tokenCapacitor,
    exchange,
  };
}
