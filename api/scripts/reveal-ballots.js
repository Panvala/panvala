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

function encode(choices, tc) {
  const resources = [];
  const firstChoices = [];
  const secondChoices = [];

  choices.forEach(choice => {
    const cat = tc.address; // NOTE: THIS IS A HACK. ONLY SUPPORTS 1 CATEGORY (GRANT PROPOSALS)
    resources.push(cat);
    firstChoices.push(choice.firstChoice);
    secondChoices.push(choice.secondChoice);
  });

  return voting.encodeBallot(resources, firstChoices, secondChoices);
}

async function run() {
  const { provider, gatekeeper: ROGatekeeper, tokenCapacitor } = getContracts();
  const mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
  const wallet = new ethers.Wallet(mnemonicWallet.privateKey, provider);
  const gatekeeper = ROGatekeeper.connect(wallet);
  console.log('gatekeeper:', gatekeeper.address);

  const epochNumber = (await gatekeeper.functions.currentEpochNumber()).toString();
  console.log('epochNumber:', epochNumber);

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

    const encodedBallot = encode(data.VoteChoices, tokenCapacitor);
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
      // const a = JSON.parse(error.responseText);
      // console.log(a);
      // console.error(a.error.message);
      process.exit(1);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
