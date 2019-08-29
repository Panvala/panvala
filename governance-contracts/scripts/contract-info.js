/* globals artifacts web3 */
const Gatekeeper = artifacts.require('Gatekeeper');
const TokenCapacitor = artifacts.require('TokenCapacitor');
const ParameterStore = artifacts.require('ParameterStore');

const ethers = require('ethers');

const { formatUnits, commify } = ethers.utils;

// get info about the current state of the contracts

function printTokens(base, label) {
  const tokens = formatUnits(base.toString(), 18);
  console.log(label, commify(tokens), 'PAN');
}

function asDate(ts) {
  return new Date(ts.toNumber() * 1000);
}

async function tokenCapacitorStats(tc) {
  try {
    console.log('TokenCapacitor at', tc.address);
    // console.log(tc);
    try {
      const ps = await tc.parameters();
      console.log('Linked ParameterStore:', ps);
    } catch (error) {
      console.error('problem getting ParameterStore', error);
    }

    try {
      const token = await tc.token();
      console.log('Linked Token:', token);
    } catch (error) {
      console.error('problem getting Token', error);
    }

    const unlockedBalance = await tc.unlockedBalance();
    printTokens(unlockedBalance, 'unlockedBalance');

    // lastLockedTime
    const lastLockedTime = await tc.lastLockedTime();
    console.log('lastLockedTime', asDate(lastLockedTime));

    // lastLockedBalance
    const lastLockedBalance = await tc.lastLockedBalance();
    printTokens(lastLockedBalance, 'lastLockedBalance');

    // projected balance as next epoch start
    // Fri Nov 01 2019 17:00:00 GMT+0000 : Epoch start -- 1572627600
    const nextEpoch = 1572627600;
    const projectedUnlocked = await tc.projectedUnlockedBalance(nextEpoch);
    printTokens(projectedUnlocked, 'projectedUnlockedBalance');

    try {
      const proposalCount = await tc.proposalCount();
      console.log(`${proposalCount.toString()} proposals`);
    } catch (error) {
      console.error('problem getting proposal count', error);
    }

    console.log();
  } catch (error) {
    console.error(error);
  }
}

async function gatekeeperStats(g) {
  try {
    console.log('Gatekeeper at', g.address);

    const startTime = await g.startTime();
    console.log('start time', asDate(startTime));

    const epochNumber = await g.currentEpochNumber();
    console.log('epochNumber', epochNumber.toString());

    const parameterStoreAddress = await g.parameters();
    const ps = await ParameterStore.at(parameterStoreAddress);

    console.log('Linked ParameterStore:', ps.address);
    const initialized = await ps.initialized();
    console.log('initialized? ', initialized);
    const stakeAmount = await ps.getAsUint('slateStakeAmount');
    const donationAddress = await ps.getAsAddress('stakeDonationAddress');
    const gatekeeperAddress = await ps.getAsAddress('gatekeeperAddress');

    console.log(' - slateStakeAmount', formatUnits(stakeAmount.toString(), 18));
    console.log(' - stakeDonationAddress', donationAddress);
    console.log(' - gatekeeperAddress', gatekeeperAddress);

    // slate submission deadline
    const tc = await TokenCapacitor.deployed();
    const deadline = await g.slateSubmissionDeadline(epochNumber, tc.address);
    console.log('slate submission deadline', asDate(deadline));

    const slateCount = await g.slateCount();
    console.log(`${slateCount.toString()} slates`);
  } catch (error) {
    console.error(error);
  }
}

async function run(networkID) {
  console.log('We are on network', networkID);


  // perform actions
  const tc = await TokenCapacitor.at('0x9a7B675619d3633304134155c6c976E9b4c1cfB3');
  const lptc = await TokenCapacitor.at('0x171dcDE3AC66a6DbED0FaC5e1d53132145520302');
  const g = await Gatekeeper.at('0x21C3FAc9b5bF2738909C32ce8e086C2A5e6F5711');

  try {
    console.log('Token Capacitor stats');
    await tokenCapacitorStats(tc);
    console.log('Launch partner fund stats');
    await tokenCapacitorStats(lptc);
  } catch (error) {
    console.error(error);
  }

  await gatekeeperStats(g);
  console.log('done');

  return true;
}

module.exports = (done) => {
  web3.eth.net.getId((err, network) => {
    if (err) {
      return done(err); // truffle exec exits if an error gets returned
    }
    return run(network).then(() => done());
  });
};
