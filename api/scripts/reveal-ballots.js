const { voting } = require('../../packages/panvala-utils');
const ethers = require('ethers');
const { SubmittedBallot, VoteChoice } = require('../models');
const { getContracts } = require('../utils/eth');

const mnemonic = process.env.MNEMONIC;

async function getBallots(epochNumber) {
  const data = await SubmittedBallot.findAll({
    where: {
      epochNumber,
    },
    include: [VoteChoice],
  });
  return data;
}

function encode(choices) {
  const resources = [];
  const firstChoices = [];
  const secondChoices = [];

  choices.forEach(choice => {
    resources.push(choice.resource);
    firstChoices.push(choice.firstChoice);
    secondChoices.push(choice.secondChoice);
  });

  return voting.encodeBallot(resources, firstChoices, secondChoices);
}

function parseArgs() {
  const argv = process.argv;

  const parsed = {};
  // node reveal-ballots.js [EPOCH]
  if (argv.length === 2) {
    // default, use current epoch number - 1
    parsed.targetEpoch = 'current';
  } else if (argv.length === 3) {
    const [, , rest] = argv;
    parsed.targetEpoch = rest[0];
  } else {
    console.log('Usage: reveal-ballots.js [EPOCH]');
    process.exit(0);
  }

  // console.log(parsed);
  return parsed;
}

async function run() {
  const { targetEpoch } = parseArgs();

  const { provider, gatekeeper: ROGatekeeper } = getContracts();
  const mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
  const wallet = new ethers.Wallet(mnemonicWallet.privateKey, provider);
  const gatekeeper = ROGatekeeper.connect(wallet);
  console.log('gatekeeper:', gatekeeper.address);

  // If the user specified an epoch, use it. Otherwise, use the one before the current one
  const currentEpoch = await gatekeeper.functions.currentEpochNumber();
  const epochNumber = targetEpoch === 'current' ? currentEpoch.sub(1).toString() : targetEpoch;
  console.log('Current epoch:', currentEpoch.toString());
  console.log('Revealing for epoch:', epochNumber);

  // read ballots from the database
  const ballots = await getBallots(epochNumber);
  console.log('ballots:', ballots);

  if (ballots.length === 0) {
    console.log(`No ballots for batch ${epochNumber}`);
    process.exit();
  }

  // Filter out the ones that have already been revealed
  const ballotPromises = ballots.map(b => {
    const _ballot = b.get({ plain: true });
    return gatekeeper.functions.didReveal(epochNumber, _ballot.voterAddress).then(didReveal => {
      // console.log(didReveal, _ballot);
      return { ..._ballot, didReveal };
    });
  });

  const enriched = await Promise.all(ballotPromises);
  console.log('ENRICHED', enriched);

  const toReveal = enriched.filter(e => e.didReveal === false);
  console.log('TO REVEAL', toReveal);

  if (toReveal.length === 0) {
    console.log(`All ballots already revealed for batch ${epochNumber}`);
    process.exit(0);
  }

  // console.log(gatekeeper.functions);

  // encode the ballots
  const voters = [];
  const encodedBallots = [];
  const salts = [];

  // Prepare data
  console.log(`Preparing data for ${toReveal.length} ballot(s) ...`);
  toReveal.forEach(ballot => {
    const data = ballot;
    console.log('did reveal? ', data.didReveal);
    voters.push(data.voterAddress);

    const encodedBallot = encode(data.VoteChoices);
    encodedBallots.push(encodedBallot);

    salts.push(data.salt);
  });

  // Reveal
  console.log('voters:', voters);
  console.log('encodedBallots:', encodedBallots);
  console.log('salts:', salts);

  try {
    console.log(`Revealing ${voters.length} ballot(s)...`);

    try {
      const tx = await gatekeeper.functions.revealManyBallots(
        epochNumber,
        voters,
        encodedBallots,
        salts
      );
      console.log(tx);

      console.log('DONE');
      process.exit(0);
    } catch (error) {
      console.error('Error', error);
      const a = JSON.parse(error.responseText);
      // console.log(a);

      console.log('');
      console.log(`Problem revealing ballots -- ${a.error.message}`);
      process.exit(1);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
