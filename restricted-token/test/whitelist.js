/* eslint-env mocha */
/* global assert contract */

const utils = require('./utils');

const { expectRevert, expectWhitelisted } = utils;

contract('RestrictedToken', (accounts) => {
  describe('addToWhitelist', () => {
    // console.log(accounts);
    const [owner, alice, bob, carol] = accounts;

    let token;

    beforeEach(async () => {
      // deploy a token
      const whitelist = [alice, bob];
      token = await utils.newToken(owner, whitelist);
    });

    it('should allow the owner to add a new account to the whitelist', async () => {
      // Carol is not whitelisted
      await expectWhitelisted(token, carol, false);

      // Add Carol to the whitelist
      const receipt = await token.addToWhitelist(carol, { from: owner });

      // Check logs
      const { whitelisted } = receipt.logs[0].args;
      assert.strictEqual(whitelisted.toString(), carol, 'Wrong address was whitelisted');

      // Carol is whitelisted
      await expectWhitelisted(token, carol, true);
    });

    it('should not allow someone who is not the owner to whitelist an account', async () => {
      // Alice is not the owner
      const isOwner = await token.isOwner({ from: alice });
      assert.strictEqual(isOwner, false);

      // Carol is not whitelisted
      await expectWhitelisted(token, carol, false);

      // Alice tries to add Carol to the whitelist
      try {
        await token.addToWhitelist(carol, { from: alice });
      } catch (error) {
        expectRevert(error);
        return;
      }
      assert.fail('allowed non-owner to whitelist an account');
    });

    it('should revert if the provided account is the zero address', async () => {
      const zero = utils.zeroAddress();

      // Try to add the zero address
      try {
        await token.addToWhitelist(zero, { from: owner });
      } catch (error) {
        expectRevert(error);
        return;
      }
      assert.fail('added zero address to the whitelist');
    });

    it('should revert if the address is already whitelisted', async () => {
      // Alice is whitelisted
      await expectWhitelisted(token, alice, true);

      // Try to add Alice to the whitelist
      try {
        await token.addToWhitelist(alice, { from: owner });
      } catch (error) {
        expectRevert(error);
        return;
      }
      assert.fail('added whitelisted address again');
    });
  });

  describe('removeFromWhitelist', () => {
    const [owner, alice, bob, carol] = accounts;
    let token;

    beforeEach(async () => {
      // deploy a token
      const whitelist = [alice, bob];
      token = await utils.newToken(owner, whitelist);
    });

    it('should allow the owner to remove an account from the whitelist', async () => {
      // Bob is whitelisted
      await expectWhitelisted(token, bob, true);

      // Remove Bob from the whitelist
      const receipt = await token.removeFromWhitelist(bob, { from: owner });

      // Check logs
      const { removed } = receipt.logs[0].args;
      assert.strictEqual(removed.toString(), bob, 'Wrong address was removed');

      // Bob is no longer whitelisted
      await expectWhitelisted(token, bob, false);
    });

    it('should not allow someone who is not the owner to remove an account from the whitelist', async () => {
      // Bob is whitelisted
      await expectWhitelisted(token, bob, true);

      // Alice is not the owner
      const isOwner = await token.isOwner({ from: alice });
      assert.strictEqual(isOwner, false);

      // Alice tries to remove Bob from the whitelist
      try {
        await token.removeFromWhitelist(bob, { from: alice });
      } catch (error) {
        expectRevert(error);
        return;
      }
      assert.fail('non-owner removed a user from the whitelist');
    });

    it('should revert if the provided account is the zero address', async () => {
      const zero = utils.zeroAddress();

      // Try to remove the zero address
      try {
        await token.removeFromWhitelist(zero, { from: owner });
      } catch (error) {
        expectRevert(error);
        return;
      }
      assert.fail('non-owner removed a user from the whitelist');
    });

    it('should revert if the address is not whitelisted', async () => {
      // Carol is not whitelisted
      await expectWhitelisted(token, carol, false);

      // Try to remove Carol from the whitelist
      try {
        await token.removeFromWhitelist(carol, { from: owner });
      } catch (error) {
        expectRevert(error);
        return;
      }
      assert.fail('removed an account that was not whitelisted');
    });
  });
});
