const ethers = require('ethers');
const { EthEvents } = require('eth-events');

const { getContracts } = require('../utils/eth');
const {
  contractABIs: { ParameterStore },
} = require('../../packages/panvala-utils');
const {
  contracts: { genesisBlockNumber },
  rpcEndpoint,
} = require('../utils/config');

module.exports = {
  async getAll(req, res) {
    const { gatekeeper, provider } = getContracts();

    // get the parameter store associated with the gatekeeper
    const psAddress = await gatekeeper.functions.parameters();
    const parameterStore = new ethers.Contract(psAddress, ParameterStore.abi, provider);

    // get parameters
    const slateStakeAmount = (await parameterStore.getAsUint('slateStakeAmount')).toString();

    const contracts = [
      {
        abi: ParameterStore.abi,
        address: psAddress,
        name: 'Parameter Store',
      },
    ];

    const ethEvents = EthEvents(contracts, rpcEndpoint, genesisBlockNumber);

    const events = await ethEvents.getAllEvents();
    const parameterInitializedEvents = events.filter(e => e.name === 'ParameterInitialized');
    const params = parameterInitializedEvents.reduce((acc, val) => {
      return {
        [val.values.key]: val.values.value,
        ...acc,
      };
    }, {});
    console.log('params:', params);

    const parameters = {
      slateStakeAmount,
      gatekeeperAddress: gatekeeper.address,
      ...params,
    };

    res.send(JSON.stringify(parameters));
  },
};
