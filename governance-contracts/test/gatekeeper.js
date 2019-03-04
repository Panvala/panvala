/* eslint-env mocha */
/* global assert artifacts contract */

const utils = require('./utils');

const Gatekeeper = artifacts.require('Gatekeeper');
const ParameterStore = artifacts.require('ParameterStore');
const Slate = artifacts.require('Slate');

const { expectRevert } = utils;


contract('Gatekeeper', (accounts) => {
  describe('constructor', () => {
    const [creator] = accounts;

    it('should correctly initialize the gatekeeper', async () => {
      const startTime = '6000';
      const stakeAmount = '5000';
      const gatekeeper = await Gatekeeper.new(startTime, stakeAmount, { from: creator });

      // Check initial values
      // start time
      const actualStartTime = await gatekeeper.startTime({ from: creator });
      assert.strictEqual(actualStartTime.toString(), startTime.toString());

      // batch length
      const batchLength = await gatekeeper.batchLength();
      const expected = 604800 * 13;
      assert.strictEqual(batchLength.toString(), expected.toString());

      // mutable parameters
      const ps = await gatekeeper.parameters();
      const parameters = await ParameterStore.at(ps);

      // stake amount
      const actualStakeAmount = await parameters.get('slateStakeAmount');
      assert.strictEqual(actualStakeAmount.toString(), stakeAmount.toString());
    });
  });

  describe('currentBatchNumber', () => {
    it('should correctly calculate the initial batch number');
    it('should correctly calculate a subsequent batch number');
  });

  describe('currentBatchStart', () => {
    it('should calculate the start of the initial batch as the start time');
    it('should correctly calculate the batch start time');
  });

  describe('recommendSlate', () => {
    const [creator, recommender] = accounts;
    let gatekeeper;
    let requestIDs;
    const metadataHash = utils.createMultihash('my slate');

    beforeEach(async () => {
      gatekeeper = await utils.newGatekeeper({ from: creator });
      requestIDs = [0, 1, 2, 3];
    });

    it('should create a new slate with the provided data', async () => {
      const batchNumber = 0;
      const category = 0;
      const receipt = await gatekeeper.recommendSlate(
        batchNumber,
        category,
        requestIDs,
        utils.asBytes(metadataHash),
        { from: recommender },
      );

      // Verify log values
      const {
        slateID,
        recommender: emittedRecommender,
        metadataHash: emittedHash,
      } = receipt.logs[0].args;

      assert.strictEqual(slateID.toString(), '0', 'SlateID is incorrect');
      assert.strictEqual(emittedRecommender, recommender, 'Recommender is incorrect');
      assert.strictEqual(utils.bytesAsString(emittedHash), metadataHash, 'Metadata hash is incorrect');

      // Incremented slate count
      const slateCount = await gatekeeper.slateCount();
      assert.strictEqual(slateCount.toString(), '1', 'Slate count was not properly incremented');

      // Check that we can interact with the slate
      const slateAddress = await gatekeeper.slates(slateID);
      const newSlate = await Slate.at(slateAddress);
      assert.strictEqual(newSlate.address, slateAddress, 'Slate address is incorrect');
    });
  });

  describe('requestPermission', () => {
    const [creator, requestor] = accounts;
    let gatekeeper;
    const metadataHash = utils.createMultihash('my request data');
    const decode = utils.bytesAsString;

    beforeEach(async () => {
      gatekeeper = await utils.newGatekeeper({ from: creator });
    });

    it('should create a new Request', async () => {
      const receipt = await gatekeeper.requestPermission(
        utils.asBytes(metadataHash),
        { from: requestor },
      );

      // Check log values
      const { requestID, metadataHash: emittedHash } = receipt.logs[0].args;
      // console.log(emittedHash, metadataHash);
      assert.strictEqual(decode(emittedHash), metadataHash, 'Metadata hash is incorrect');

      // Check Request
      const { metadataHash: requestHash, approved } = await gatekeeper.requests(requestID);
      assert.strictEqual(decode(requestHash), metadataHash, 'Metadata hash is incorrect');
      assert.strictEqual(approved, false);

      // Request count was incremented
      const requestCount = await gatekeeper.requestCount();
      assert.strictEqual(requestCount.toString(), '1', 'Request count is incorrect');
    });

    // rejection criteria:
    it('should not allow an empty metadataHash', async () => {
      const emptyHash = '';

      try {
        await gatekeeper.requestPermission(
          utils.asBytes(emptyHash),
          { from: requestor },
        );
      } catch (error) {
        expectRevert(error);
        return;
      }
      assert.fail('allowed creation of a request with an empty metadataHash');
    });
  });
});
