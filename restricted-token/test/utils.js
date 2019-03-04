/* globals artifacts assert */
const ethUtils = require('ethereumjs-util');
const { calculateSupply } = require('../helpers/token');

const RestrictedToken = artifacts.require('RestrictedToken');

/**
 * @param {RestrictedToken} token The token
 * @param {Address} account The account to check
 * @param {boolean} expected The expected whitelist status
 */
async function expectWhitelisted(token, account, expected) {
  // console.log(arguments);
  const isWhitelisted = await token.isWhitelisted.call(account);
  const msg = expected ? 'Account should have been whitelisted' : 'Account should not have been whitelisted';
  assert.strictEqual(isWhitelisted, expected, msg);
}

/**
 * Check that the error is an EVM `revert`
 * @param {Error} error The error to check
 */
function expectRevert(error) {
  assert(
    error.toString().includes('VM Exception while processing transaction: revert'),
    `Expected revert -- ${error}`,
  );
}

/**
 * Convenience function for creating a token
 * @param {Address} owner
 * @param {Array} whitelist
 * @param {Object} params : { decimals, initialTokens }
 */
async function newToken(owner, whitelist, params) {
  const tokenParams = params || {};
  const decimals = tokenParams.decimals || '18';
  const initialTokens = tokenParams.initialTokens || 100000;

  const supply = calculateSupply(initialTokens, decimals);
  return RestrictedToken.new('Restricted Token', 'PANR', decimals.toString(), supply, whitelist, {
    from: owner,
  });
}

const utils = {
  expectRevert,
  expectWhitelisted,
  zeroAddress: ethUtils.zeroAddress,
  BN: ethUtils.BN,
  newToken,
};

module.exports = utils;
