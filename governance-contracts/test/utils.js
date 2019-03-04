/* globals artifacts assert */
const ethUtils = require('ethereumjs-util');
const bs58 = require('bs58');

const Gatekeeper = artifacts.require('Gatekeeper');

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

function createMultihash(data) {
  const digest = ethUtils.sha256(data);

  const hashFunction = Buffer.from('12', 'hex'); // 0x20
  const digestSize = Buffer.from(digest.byteLength.toString(16), 'hex');
  const combined = Buffer.concat([hashFunction, digestSize, digest]);
  const multihash = bs58.encode(combined);

  // console.log(multihash.toString()); // QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L4

  return multihash.toString();
}

async function newGatekeeper(options) {
  const creator = options.from;
  const startTime = '6000';
  const stakeAmount = '5000';
  const gatekeeper = await Gatekeeper.new(startTime, stakeAmount, { from: creator });

  return gatekeeper;
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

const utils = {
  expectRevert,
  zeroAddress: ethUtils.zeroAddress,
  BN: ethUtils.BN,
  createMultihash,
  newGatekeeper,
  asBytes,
  stripHexPrefix,
  bytesAsString,
};

module.exports = utils;
