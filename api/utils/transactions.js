const { providers, Contract } = require('ethers');
const {
  contractABIs: { Gatekeeper, TokenCapacitor },
} = require('../../packages/panvala-utils');

const {
  contracts: { gatekeeperAddress, tokenCapacitorAddress, genesisBlockNumber },
  rpcEndpoint,
} = require('./config');

async function getAllEvents(address) {
  const provider = new providers.JsonRpcProvider(rpcEndpoint);
  // Get an interface to the Gatekeeper contract
  const gatekeeper = new Contract(gatekeeperAddress, Gatekeeper.abi, provider);
  const tokenCapacitor = new Contract(tokenCapacitorAddress, TokenCapacitor.abi, provider);
  const contractAddresses = [gatekeeperAddress, tokenCapacitorAddress];

  const currentBlockNumber = await provider.getBlockNumber();
  console.log('currentBlockNumber:', currentBlockNumber);

  let events = [];
  for (let i = genesisBlockNumber; i <= currentBlockNumber; i++) {
    const block = await provider.getBlock(i, true);
    // console.log('block:', block);

    if (block.transactions) {
      await Promise.all(
        block.transactions.map(async tx => {
          if (
            (contractAddresses.includes(tx.to) || contractAddresses.includes(tx.from)) &&
            [tx.to, tx.from].includes(address)
          ) {
            return provider.getTransactionReceipt(tx.hash).then(receipt => {
              // console.log('receipt:', receipt);
              const gkEvents = decodeLogs(gatekeeper, receipt.logs);
              const tcEvents = decodeLogs(tokenCapacitor, receipt.logs);
              // console.log("gkEvents:", gkEvents);
              events = events.concat(gkEvents).concat(tcEvents);
              return events;
            });
          }
          return;
        })
      );
    }
  }

  console.log('events:', events);
  return events;
}

function decodeLogs(contract, logs) {
  return logs.map(log => contract.interface.parseLog(log)).filter(l => l !== null);
}

module.exports = {
  getAllEvents,
};
