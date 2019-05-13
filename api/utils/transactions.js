const { providers, Contract } = require('ethers');
const range = require('lodash/range');
const flatten = require('lodash/flatten');
const {
  contractABIs: { Gatekeeper, TokenCapacitor },
} = require('../../packages/panvala-utils');

const {
  contracts: { gatekeeperAddress, tokenCapacitorAddress, genesisBlockNumber },
  rpcEndpoint,
} = require('./config');

/**
 * Gets all events from genesis block (contract) -> current block
 */
async function getAllEvents() {
  const provider = new providers.JsonRpcProvider(rpcEndpoint);
  // Get an interface to the Gatekeeper contract
  const gatekeeper = new Contract(gatekeeperAddress, Gatekeeper.abi, provider);
  const tokenCapacitor = new Contract(tokenCapacitorAddress, TokenCapacitor.abi, provider);

  const currentBlockNumber = await provider.getBlockNumber();
  console.log('currentBlockNumber:', currentBlockNumber);

  const blocksRange = range(genesisBlockNumber, currentBlockNumber + 1);

  const events = await Promise.all(
    blocksRange.map(async blockNumber => {
      const block = await provider.getBlock(blockNumber, true);
      const logsInBlock = await getLogsInBlock(block, provider, gatekeeper, tokenCapacitor);
      // [[Log, Log]] -> [Log, Log]
      // [[]] -> []
      return flatten(logsInBlock);
    })
  );

  // [[], [], [Log, Log]] -> [Log, Log]
  return flatten(events);
}

/**
 * Gets decoded logs from all transactions in a single block
 * @param {*} block
 * @returns {Array}
 */
async function getLogsInBlock(block, provider, gatekeeper, tokenCapacitor) {
  return Promise.all(
    block.transactions.map(async tx => {
      return provider.getTransactionReceipt(tx.hash).then(receipt => {
        if (receipt.logs.length > 0) {
          const gkEvents = decodeLogs(gatekeeper, block, tx, receipt.logs);
          const tcEvents = decodeLogs(tokenCapacitor, block, tx, receipt.logs);
          return gkEvents.concat(tcEvents);
        }
        return [];
      });
    })
  );
}

const extraneousEventNames = [
  'PermissionRequested',
  'VotingTokensDeposited',
  'VotingTokensWithdrawn',
  'BallotCommitted',
  'BallotRevealed',
  'ConfidenceVoteCounted',
  'RunoffCounted',
];

/**
 * Decodes raw logs using an ethers.js contract interface
 * @param {ethers.Contract} contract ethers.js contract
 * @param {*} block
 * @param {*} tx transaction from a block
 * @param {*} logs raw logs
 * @returns Filtered (!null) array of decoded logs w/ additional transaction information
 */
function decodeLogs(contract, block, tx, logs) {
  return logs
    .map(log => {
      let decoded = contract.interface.parseLog(log);
      if (decoded) {
        if (extraneousEventNames.includes(decoded.name)) {
          return null;
        }
        return {
          ...decoded,
          sender: tx.from,
          recipient: tx.to,
          timestamp: block.timestamp,
          blockNumber: block.number,
          txHash: tx.hash,
          logIndex: log.logIndex,
          toContract:
            tx.to === gatekeeperAddress
              ? 'GATEKEEPER'
              : tx.to === tokenCapacitorAddress
              ? 'TOKEN_CAPACITOR'
              : '?',
        };
      }
      // null || custom, decoded log
      return decoded;
    })
    .filter(l => l !== null);
}

module.exports = {
  getAllEvents,
};
