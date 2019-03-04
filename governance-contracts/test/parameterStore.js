/* eslint-env mocha */
/* global assert artifacts contract */

// const utils = require('./utils');
const ParameterStore = artifacts.require('ParameterStore');


contract('ParameterStore', (accounts) => {
  describe('constructor', () => {
    const [creator] = accounts;
    const data = {
      apples: 2,
      bananas: 3,
    };
    let names;
    let values;

    beforeEach(() => {
      names = Object.keys(data);
      values = Object.values(data);
    });

    it('should correctly initialize the parameter store', async () => {
      const parameters = await ParameterStore.new(
        names, values,
        { from: creator },
      );

      // get values
      const apples = await parameters.get('apples');
      assert.strictEqual(apples.toString(), '2');

      const bananas = await parameters.get('bananas');
      assert.strictEqual(bananas.toString(), '3');
    });

    it('should be okay with no initial values', async () => {
      await ParameterStore.new([], []);
    });
  });

  // get - what about non-existent values
});
