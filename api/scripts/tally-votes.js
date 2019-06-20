const { voting } = require('../../packages/panvala-utils');
const { ContestStatus } = voting;

const { getContracts } = require('../utils/eth');

const categoryName = {
  '0': 'GRANT',
  '1': 'GOVERNANCE',
};

async function tally(gatekeeper, ballotID, resource, index) {
  console.log(`Processing category ${categoryName[index]}`);

  let status = await gatekeeper.functions.contestStatus(ballotID, resource);
  console.log('status', status);

  if (status.toString() === ContestStatus.NoContest) {
    console.log(`No challenger for resource ${resource} -- automatically finalizing`);
    await gatekeeper.functions.countVotes(ballotID, resource);

    status = await gatekeeper.functions.contestStatus(ballotID, resource);
    console.log('new status', status);
  }

  if (status.toString() === ContestStatus.Active) {
    console.log('Counting votes for ballotID, resource, status', ballotID, resource, status);
    await gatekeeper.functions.countVotes(ballotID, resource);
    console.log('counted votes!');

    status = await gatekeeper.functions.contestStatus(ballotID, resource);
    console.log('new status', status);
  }

  if (status.toString() === ContestStatus.RunoffPending) {
    console.log(`Counting runoff votes for category ${categoryName[index]}`);
    await gatekeeper.functions.countRunoffVotes(ballotID, resource);
  }
}

async function run() {
  const { gatekeeper, tokenCapacitor, parameterStore } = await getContracts();

  // const epochNumber = (await gatekeeper.functions.currentEpochNumber()).sub(1);
  const epochNumber = 1;
  console.log("epochNumber:", epochNumber);
  const contests = [tokenCapacitor.address, parameterStore.address];

  try {
    console.log('Tallying votes for all categories...');
    const tallyAllCategories = contests.map((contest, index) =>
      tally(gatekeeper, epochNumber, contest, index)
    );
    await Promise.all(tallyAllCategories);
    console.log('DONE');
  } catch (error) {
    console.error(error);
  }
}

run();
