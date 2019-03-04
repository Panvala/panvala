import { ethers, providers } from 'ethers';
const TokenCapacitor = require('./abis/TokenCapacitor.json');
const Gatekeeper = require('./abis/Gatekeeper.json');

// contract abstractions for gate_keeper and token_capacitor
export function connectContracts(provider: providers.Web3Provider) {
  const tokenCapacitorAddress = '0xAabC1fE9c4A43CaFF0D70206B7C7D18E9A279894';
  const gateKeeperAddress = '0x8A3f7Ad6b368A6043D0D60Fda425c90DE6126005';
  const tcAbi = TokenCapacitor.abi;
  const gcAbi = Gatekeeper.abi;

  const tcContract = new ethers.Contract(tokenCapacitorAddress, tcAbi, provider);
  const gcContract = new ethers.Contract(gateKeeperAddress, gcAbi, provider);

  return { tcContract, gcContract };
}

// ethers-metamask-provider
// connects to whichever network metamask is connected to
export async function connectProvider(window: any) {
  const ethProvider: providers.Web3Provider = new providers.Web3Provider(window.ethereum);
  return ethProvider;
}
