/* eslint-env mocha */
/* global assert contract */

const utils = require('./utils');

const { expectRevert, expectWhitelisted } = utils;

contract('RestrictedToken', (accounts) => {
  describe('transfer', () => {
    const [owner, alice, bob, carol] = accounts;
    let token;

    beforeEach(async () => {
      // deploy a token
      const whitelist = [alice, bob];
      token = await utils.newToken(owner, whitelist);
    });

    it('should allow a transfer to a whitelisted account', async () => {
      // Alice is whitelisted
      await expectWhitelisted(token, alice, true);

      // do the transfer
      const amount = new utils.BN(1000);
      const receipt = await token.transfer(alice, amount, { from: owner });
      const { to, value } = receipt.logs[0].args;
      // console.log(to, value, amount, recipient);

      assert.strictEqual(value.toString(), amount.toString(), 'Transferred the wrong amount');
      assert.strictEqual(to, alice, 'Transferred to the wrong account');
    });

    it('should not allow a transfer to a non-whitelisted account', async () => {
      // Carol is not whitelisted
      await expectWhitelisted(token, carol, false);

      // Try to transfer to Carol
      const amount = new utils.BN(1000);
      try {
        await token.transfer(carol, amount, { from: owner });
      } catch (error) {
        expectRevert(error);
        return;
      }
      assert.fail('transferred token to a non-whitelisted account');
    });

    it('should allow a transfer from a previously whitelisted account', async () => {
      // Bob is whitelisted
      await expectWhitelisted(token, bob, true);

      // Give some tokens to Bob
      const amount = new utils.BN(1000);
      await token.transfer(bob, amount, { from: owner });

      // Remove Bob from the whitelist
      await token.removeFromWhitelist(bob, { from: owner });
      await expectWhitelisted(token, bob, false);

      // Alice is whitelisted
      await expectWhitelisted(token, alice, true);

      // Bob tries to transfer to Alice
      await token.transfer(alice, amount, { from: bob });
    });
  });

  describe('transferFrom', () => {
    const [owner, alice, bob, carol, david] = accounts;
    let token;
    let allowance;

    beforeEach(async () => {
      // deploy a token
      const whitelist = [alice, bob, carol];
      token = await utils.newToken(owner, whitelist);

      // Give tokens to Alice
      const amount = new utils.BN(1000);
      await token.transfer(alice, amount, { from: owner });

      // Alice approves Bob to spend on her behalf
      allowance = new utils.BN(500);
      await token.approve(bob, allowance, { from: alice });
    });

    it('should allow a transferFrom to a whitelisted account', async () => {
      // Carol is whitelisted
      await expectWhitelisted(token, carol, true);

      // Bob transfers Alice's tokens to Carol
      await token.transferFrom(alice, carol, allowance, { from: bob });

      // Carol has the tokens now
      const balance = await token.balanceOf(carol);
      assert.strictEqual(balance.toString(), allowance.toString(), 'Sent the wrong number of tokens');
    });

    it('should not allow a transfer to a non-whitelisted account', async () => {
      // David is not whitelisted
      await expectWhitelisted(token, david, false);

      // Bob tries to transfer Alice's tokens to David
      try {
        await token.transferFrom(alice, david, allowance, { from: bob });
      } catch (error) {
        expectRevert(error);
        return;
      }
      assert.fail('allowed transferFrom to a non-whitelisted account');
    });

    it('should allow a transferFrom with a previously whitelisted account', async () => {
      // Bob is whitelisted
      await expectWhitelisted(token, bob, true);

      // Remove Bob from the whitelist
      await token.removeFromWhitelist(bob, { from: owner });
      await expectWhitelisted(token, bob, false);

      // Carol is whitelisted
      await expectWhitelisted(token, carol, true);

      // Bob tries to transfer Alice's tokens to Carol
      await token.transferFrom(alice, carol, allowance, { from: bob });

      // Carol has the tokens
      const balance = await token.balanceOf(carol);
      assert.strictEqual(balance.toString(), allowance.toString(), 'Sent the wrong number of tokens');
    });
  });
});
