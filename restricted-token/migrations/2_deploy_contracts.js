/* globals artifacts */
const RestrictedToken = artifacts.require('RestrictedToken');

const fs = require('fs');
const { calculateSupply } = require('../helpers/token');

const config = JSON.parse(fs.readFileSync('../conf/config.json'));

// eslint-disable-next-line func-names
module.exports = function (deployer, network) {
  if (network === 'development' || network === 'coverage') {
    // don't do anything -- the tests handle deployment at the moment
  } else {
    const {
      name, symbol, initialTokens, decimals, whitelist,
    } = config.token;

    const initialSupply = calculateSupply(initialTokens, decimals);
    deployer.deploy(RestrictedToken, name, symbol, decimals, initialSupply.toString(10), whitelist);
  }
};
