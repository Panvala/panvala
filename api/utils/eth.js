const ethers = require('ethers');
const config = require('./config');
const { rpcEndpoint } = config;
const { gatekeeperAddress } = config.contracts;

const Gatekeeper = require('../contracts/Gatekeeper.json');

/**
 * Check connection
 */
function checkConnection() {
  // console.log('Connecting to', rpcEndpoint);
  const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);

  return provider.getBlockNumber();
}


function getContracts() {
  const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
  const gatekeeper = new ethers.Contract(gatekeeperAddress, Gatekeeper.abi, provider);

  return {
    gatekeeper,
  }
}

module.exports = {
  checkConnection,
  getContracts,
};
