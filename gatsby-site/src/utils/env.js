import { Contract } from 'ethers';
import { exchangeAbi, exchangeV2Abi, tcAbi, tokenAbi } from './abis';
import { networks, tokens } from '../data';
import { TokenEnums } from './communityDonate';

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
  
  if (!chainId)
    throw new Error('MetaMask is not connected.');

  const tokenName = TokenEnums.PAN;
  const tokenAddress = tokens[tokenName]?.addresses[chainId.toString()];
  if (!tokenAddress) {
    throw new Error(`Address data not found for token ${tokenName}`);
  }
  const tokenCode = await provider.getCode(tokenAddress);
  if (!tokenCode) {
    throw new Error(`Token code data not found at address for token ${tokenName}`);
  }
  const token = new Contract(tokenAddress, tokenAbi, signer);
  console.log(`Initialized contract for token ${tokenName} at address: `, tokenAddress);

  const networkData = networks[chainId.toString()];
  const exchangeAddress = networkData.addresses.EXCHANGE_ADDRESS;
  const exchangeCode = await provider.getCode(exchangeAddress);
  if (!exchangeAddress || !exchangeCode) {
    throw new Error('Invalid address or no code at address for exchange: ', networkData.exchangeName);
  }
  const exchange = new Contract(exchangeAddress, exchangeV2Abi, signer);
  console.log(`Initialized contract for exchange ${networkData.exchangeName} at address: `, exchangeAddress);

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
