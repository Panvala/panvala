/* eslint-env mocha */
/* global assert artifacts contract */

const utils = require('./utils');

const TokenCapacitor = artifacts.require('TokenCapacitor');

const { expectRevert } = utils;


contract('TokenCapacitor', (accounts) => {
  describe('constructor', () => {
    const [creator] = accounts;
    let gatekeeper;

    beforeEach(async () => {
      // deploy a gatekeeper
      gatekeeper = await utils.newGatekeeper({ from: creator });
    });

    it('should correctly initialize the capacitor', async () => {
      // deploy a new capacitor
      const capacitor = await TokenCapacitor.new(gatekeeper.address, { from: creator });

      // Gatekeeper was connected
      const connectedGatekeeper = await capacitor.gatekeeper();
      assert.strictEqual(connectedGatekeeper, gatekeeper.address);

      // no proposals yet
      const proposalCount = await capacitor.proposalCount();
      assert.strictEqual(proposalCount.toString(), '0', 'There should be no proposals yet');
    });
  });

  describe('createProposal', () => {
    const [creator, beneficiary] = accounts;
    let gatekeeper;
    let capacitor;

    beforeEach(async () => {
      // deploy a gatekeeper
      gatekeeper = await utils.newGatekeeper({ from: creator });
      // deploy a new capacitor
      capacitor = await TokenCapacitor.new(gatekeeper.address, { from: creator });
    });

    it('should create a proposal to the appropriate beneficiary', async () => {
      const to = beneficiary;
      const tokens = '1000';
      const metadataHash = utils.createMultihash('my request data');

      const receipt = await capacitor.createProposal(
        to,
        tokens,
        utils.asBytes(metadataHash),
        { from: creator },
      );

      const {
        proposer,
        requestID,
        to: emittedRecipient,
        tokens: emittedTokens,
        metadataHash: emittedHash,
      } = receipt.logs[0].args;

      // should emit event with requestID and other data
      assert.strictEqual(requestID.toString(), '0');
      assert.strictEqual(proposer, creator, 'Emitted wrong proposer');
      assert.strictEqual(emittedRecipient, to, 'Emitted wrong beneficiary');
      assert.strictEqual(emittedTokens.toString(), tokens, 'Emitted wrong number of tokens');
      assert.strictEqual(
        utils.bytesAsString(emittedHash),
        metadataHash,
        'Emitted wrong metadataHash',
      );

      // should increment proposalCount
      const proposalCount = await capacitor.proposalCount();
      assert.strictEqual(proposalCount.toString(), '1', 'Should have incremented proposalCount');

      // should save proposal with values
      const proposal = await capacitor.proposals(requestID);
      assert.strictEqual(proposal.tokens.toString(), tokens, 'Proposal has wrong number of tokens');
      assert.strictEqual(proposal.to, to, 'Proposal has wrong beneficiary');
      assert.strictEqual(
        utils.bytesAsString(proposal.metadataHash),
        metadataHash,
        'Proposal has wrong metadataHash',
      );
      // proposal should not be approved
      assert.strictEqual(proposal.approved, false, 'Proposal should not be approved');
    });

    it('should allow a proposal to send to the zero address', async () => {
      const to = utils.zeroAddress();
      const tokens = '1000';
      const metadataHash = utils.createMultihash('my request data');

      await capacitor.createProposal(
        to,
        tokens,
        utils.asBytes(metadataHash),
        { from: creator },
      );
    });

    // rejection criteria:
    it('should not allow creation of a proposal with an empty metadataHash', async () => {
      const to = beneficiary;
      const tokens = '1000';
      const emptyHash = '';

      try {
        await capacitor.createProposal(
          to,
          tokens,
          utils.asBytes(emptyHash),
          { from: creator },
        );
      } catch (error) {
        expectRevert(error);
        return;
      }
      assert.fail('allowed creation of a proposal with an empty metadataHash');
    });
  });
});
