/* eslint-env mocha */
/* global assert */

const token = require('../helpers/token');

describe('helpers', () => {
  describe('token', () => {
    it('should calculate correct supply with non-zero decimals', () => {
      const initialTokens = 100000;
      const decimals = 5;

      const supply = token.calculateSupply(initialTokens, decimals);
      assert.strictEqual(supply.toString(), '10000000000', 'Incorrectly calculated supply');
    });

    it('should calculate correct supply with zero decimals', () => {
      const initialTokens = 100000;
      const decimals = 0;

      const supply = token.calculateSupply(initialTokens, decimals);
      assert.strictEqual(supply.toString(), '100000', 'Incorrectly calculated supply');
    });
  });
});
