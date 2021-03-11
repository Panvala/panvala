import { Contract } from 'ethers';
import { exchangeAbi, tcAbi, tokenAbi, IUniswapV2ERC20, IUniswapV2Factory, IUniswapV2Router02 } from './abis';
import { exchanges, networks, tokens } from '../data';
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

export async function loadCommunityDonationContracts(provider) {
  const { chainId } = await provider.getNetwork();
  const signer = provider.getSigner();
  
  if (!chainId)
    throw new Error('MetaMask is not connected.');

  const createContract = async (contractAddress, abi) => {
    const contractCode = await provider.getCode(contractAddress);
    if (!contractAddress || !contractCode) {
      throw new Error('Invalid address or no code at address: ', contractAddress);
    }
    return new Contract(contractAddress, abi, signer);
  };

  const networkData = networks[chainId.toString()];
  const exchangeData = exchanges[networkData.exchange];
  const inputTokenData = tokens[networkData.token];

  /* Initialize Factory */
  const factoryAddress = exchangeData.addresses.factory[chainId.toString()];
  const factory = await createContract(factoryAddress, IUniswapV2Factory);
  console.log(`Initialized Factory contract for exchange ${networkData.exchange} at address: `, factoryAddress);

  /* Initialize Router */
  const routerAddress = exchangeData.addresses.router[chainId.toString()];
  const router = await createContract(routerAddress, IUniswapV2Router02);
  console.log(`Initialized Router contract for exchange ${networkData.exchange} at address: `, routerAddress);

  /* Initialize payment token */
  const inputTokenAddress = inputTokenData.addresses[chainId.toString()];
  const inputToken = await createContract(inputTokenAddress, IUniswapV2ERC20);
  console.log(`Initialized ${networkData.token} token contract for network ${networkData.name} at address: `, inputTokenAddress);

  /* Initialize PAN Token */
  const panTokenAddress = tokens[TokenEnums.PAN].addresses[chainId.toString()];
  const panToken = await createContract(panTokenAddress, IUniswapV2ERC20);
  console.log(`Initialized PAN token contract for network ${networkData.name} at address: `, panTokenAddress);

  /* Initialize WETH Token */
  const wethTokenAddress = tokens[TokenEnums.WETH].addresses[chainId.toString()];
  const wethToken = await createContract(wethTokenAddress, IUniswapV2ERC20);
  console.log(`Initialized WETH token contract for network ${networkData.name} at address: `, wethTokenAddress);

  return {
    factory,
    router,
    inputToken,
    panToken,
    wethToken,
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
