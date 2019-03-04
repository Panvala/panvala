const ethUtils = require('ethereumjs-util');

const { BN } = ethUtils;

module.exports = {
  /**
   * Calculate the supply of the token to mint: initialTokens * 10 ^ decimals.
   * @param {Number} initialTokens The total number of tokens desired
   * @param {Number} decimals The number of decimals the smallest unit of the token has
   */
  calculateSupply: (initialTokens, decimals) => {
    // calculate the initial supply:
    const tokens = new BN(initialTokens);
    const ten = new BN(10);
    const exponent = new BN(decimals);

    // const factor = ten.pow(exponent);
    const initialSupply = tokens.mul(ten.pow(exponent));
    return initialSupply;
  },
};
