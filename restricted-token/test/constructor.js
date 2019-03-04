/* eslint-env mocha */
/* global assert contract */

const utils = require('./utils');

const { expectWhitelisted } = utils;

contract('RestrictedToken', (accounts) => {
  describe('constructor', () => {
    const [owner] = accounts;

    it('should correctly initialize the token with the provided whitelist', async () => {
      // deploy a new token
      const whitelist = accounts.slice(0, 4);
      const initialTokens = 100000;
      const token = await utils.newToken(owner, whitelist, { initialTokens });

      // owner has all the tokens
      const supply = await token.totalSupply();
      const expected = `${initialTokens}000000000000000000`;
      assert.strictEqual(supply.toString(), expected, 'supply is incorrect');

      const balance = await token.balanceOf(owner);
      assert.strictEqual(balance.toString(), supply.toString(), 'Owner does not have all the tokens');
      // console.log('Owner has:', balance.toString());

      // each of the accounts should be whitelisted
      await Promise.all(whitelist.map(account => expectWhitelisted(token, account, true)));
    });
  });
});
