const ethers = require('ethers');
const ethUtils = require('ethereumjs-util');
const BigNumber = require('bignumber.js');


const { defaultAbiCoder: abiCoder } = ethers.utils;

/**
 * ABI-encode a value to pass to a contract function
 * @param {*} type
 * @param {*} value
 */
function abiEncode(type, value) {
  return abiCoder.encode([type], [value]);
}

function asBytes(string) {
  return ethUtils.toBuffer(string);
}

/**
 * stripHexPrefix
 * Remove '0x' from the beginning of a string, if present
 * @param {String} value
 * @return String
 */
function stripHexPrefix(value) {
  // assume string
  const stripped = value.startsWith('0x') ? value.substring(2) : value;
  return stripped;
}

/**
 * bytesAsString
 * @param {String} bytes Hex-encoded string returned from a contract
 * @return UTF-8 encoded string
 */
function bytesAsString(bytes) {
  const stripped = stripHexPrefix(bytes);
  const decoded = Buffer.from(stripHexPrefix(stripped), 'hex');
  return decoded.toString();
}

/**
 * zeroHash
 * @dev Return a 32-byte value of all zeros
 */
function zeroHash() {
  return ethUtils.zeros(32);
}

const ten = new BigNumber(10);
const panDecimals = new BigNumber(18);

/**
 * Convert the amount to PAN base units (string)
 * @param {number|string} tokens can be fractional
 * @return {string}
 */
function toPanBase(tokens) {
  const factor = ten.pow(panDecimals);
  const baseUnits = factor.times(new BigNumber(tokens));
  return baseUnits.toFixed();
}

/**
 *
 * @param {ethers.utils.BigNumberish} baseValue
 * @return {string}
 */
function fromPanBase(baseValue) {
  const base = new BigNumber(baseValue.toString());
  const factor = ten.pow(panDecimals);
  const tokens = base.div(factor);
  return tokens.toFixed();
}

module.exports = {
  BN: ethUtils.BN,
  abiEncode,
  asBytes,
  stripHexPrefix,
  bytesAsString,
  zeroHash,
  sha256: ethUtils.sha256,
  toPanBase,
  fromPanBase,
};
