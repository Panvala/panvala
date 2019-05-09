import { ethers, providers, Signer, Contract } from 'ethers';
import { IContracts } from '../interfaces';
import getConfig from 'next/config';
import { panvala_utils } from '.';


// Defaults are a workaround for https://github.com/zeit/next.js/issues/4024
const { publicRuntimeConfig = {} } = getConfig() || {};

// get contract abis from panvala-utils
const abis: any = panvala_utils.contractABIs;

// contract abstractions for gate_keeper and token_capacitor
export async function connectContracts(provider: providers.Web3Provider): Promise<IContracts> {
  const [tcAbi, gcAbi, tokenAbi, paramsAbi]: [any[], any[], any[], any[]] = [
    abis.TokenCapacitor.abi,
    abis.Gatekeeper.abi,
    abis.BasicToken.abi,
    abis.ParameterStore.abi,
  ];

  // read addresses from env vars
  const gcAddress: string =
    publicRuntimeConfig.gatekeeperAddress || process.env.STORYBOOK_GATEKEEPER_ADDRESS;
  const tcAddress: string =
    publicRuntimeConfig.tokenCapacitorAddress || process.env.STORYBOOK_TOKEN_CAPACITOR_ADDRESS;

  // init ethers contract abstractions
  const signer: Signer = provider.getSigner();
  const tc: Contract = new ethers.Contract(tcAddress, tcAbi, provider);
  const gc: Contract = new ethers.Contract(gcAddress, gcAbi, provider);

  // connect metamask wallet/signer to contracts
  const tokenCapacitor: Contract = tc.connect(signer);
  const gateKeeper: Contract = gc.connect(signer);

  let token, parameterStore;
  // get the token and parameter_store associated with the gate_keeper
  try {
    const tokenAddress: string = await gc.functions.token();
    const tokenContract: Contract = new ethers.Contract(tokenAddress, tokenAbi, provider);
    // connect metamask wallet/signer to token contract
    token = tokenContract.connect(signer);

    const paramsAddress: string = await gc.functions.parameters();
    parameterStore = new ethers.Contract(paramsAddress, paramsAbi, provider);
  } catch (error) {
    console.log(error);
  }

  return { tokenCapacitor, gateKeeper, token, parameterStore };
}

// ethers-metamask-provider
// connects to whichever network metamask is connected to
export async function connectProvider(ethereumProvider: any): Promise<providers.Web3Provider> {
  const ethProvider: providers.Web3Provider = new providers.Web3Provider(ethereumProvider);
  return ethProvider;
}
