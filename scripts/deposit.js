const fs = require('fs');
const path = require('path');
const ethers = require('ethers');

const currentDir = path.resolve(__dirname);
const readDir = `${currentDir}/../governance-contracts/build/contracts`;
const Gatekeeper = JSON.parse(fs.readFileSync(`${readDir}/Gatekeeper.json`));
const BasicToken = JSON.parse(fs.readFileSync(`${readDir}/BasicToken.json`));

const gatekeeperAddress = process.env.GATEKEEPER_ADDRESS;
const rpcEndpoint = process.env.RPC_ENDPOINT;

depositVotingRights();

async function depositVotingRights() {
  const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
  const signer = provider.getSigner();

  const gatekeeper = new ethers.Contract(gatekeeperAddress, Gatekeeper.abi, signer);
  const tokenAddress = await gatekeeper.token();
  const token = new ethers.Contract(tokenAddress, BasicToken.abi, signer);

  const account = signer.getAddress();
  const balance = await token.balanceOf(account);

  console.log('gatekeeper:', gatekeeper.address);
  console.log('token:', tokenAddress);
  console.log('account:', account);
  console.log('balance:', balance.toString());

  await gatekeeper.functions.depositVoteTokens(balance);
}
