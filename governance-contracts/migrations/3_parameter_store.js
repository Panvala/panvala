/* eslint-disable no-console */
/* globals artifacts */
const ParameterStore = artifacts.require('ParameterStore');

const { isValidAddress } = require('ethereumjs-util');
const { abiEncode, toPanBase } = require('../utils');

// eslint-disable-next-line func-names
module.exports = async function (deployer, networks) {
  function info(message) {
    if (networks !== 'development') {
      console.log(message);
    }
  }
  const parameterStoreAddress = '';

  if (isValidAddress(parameterStoreAddress)) {
    info(`Using ParameterStore at ${parameterStoreAddress}`);
  } else {
    const { parameterStore: paramInfo } = global.panvalaConfig;

    const stakeAmount = toPanBase(paramInfo.parameters.slateStakeAmount);

    const names = ['slateStakeAmount'];
    const values = [abiEncode('uint256', stakeAmount)];

    info(names, values);
    await deployer.deploy(ParameterStore, names, values);
  }
};
