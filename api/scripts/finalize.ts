import * as ethers from 'ethers';
import * as readline from 'readline';
import { getProposalsForRequests } from '../src/utils/requests';
import { sequelize } from '../src/models';

const { voting } = require('../src/utils');
const { ContestStatus } = voting;
const { getContracts } = require('../src/utils/eth');
const mnemonic = process.env.MNEMONIC;

const gasPrice = ethers.utils.hexlify(2e9);
sequelize.options.logging = false;

const categoryName = {
  '0': 'GRANT',
  '1': 'GOVERNANCE',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printFunctionSupport(intended = 'finalizeContest', alternative = 'countVotes') {
  console.log(
    `Gatekeeper ABI does not support method: ${intended} method. running ${alternative} instead.`
  );
}

async function firstRoundVote(epochNumber, resource, gkFuncs) {
  if (gkFuncs.hasOwnProperty('finalizeContest')) {
    await gkFuncs.finalizeContest(epochNumber, resource);
  } else {
    printFunctionSupport();
    await gkFuncs.countVotes(epochNumber, resource);
  }
}

async function finalize(gatekeeper, epochNumber, resource, index) {
  console.log(`Processing category ${categoryName[index]}`);

  const gkFuncs = gatekeeper.functions;
  const status = (await gkFuncs.contestStatus(epochNumber, resource)).toString();
  console.log('status', status);

  if (status === ContestStatus.Empty) {
    console.log(`No slates found for resource ${resource}, skipping`);
  }

  // single slate
  if (status === ContestStatus.NoContest) {
    console.log(`No challenger for resource ${resource} -- automatically finalizing`);
    const receipt = await firstRoundVote(epochNumber, resource, gkFuncs);
    console.log(receipt);
  }

  // active contest
  if (status === ContestStatus.Active) {
    console.log('Counting votes for epochNumber, resource, status', epochNumber, resource, status);
    const receipt = await firstRoundVote(epochNumber, resource, gkFuncs);
    console.log(receipt);
  }

  // contest already finalized
  if (status === ContestStatus.Finalized) {
    console.log('Contest was already finalized', epochNumber.toString(), resource);
  } else {
    const newStatus = await gkFuncs.contestStatus(epochNumber, resource);
    console.log('new status', newStatus);
  }
}

async function disburseGrants(
  wallet: ethers.ethers.Wallet,
  provider,
  gatekeeper,
  capacitor,
  epochNumber
) {
  const gk = gatekeeper.functions;
  const resource = capacitor.address;
  const status = (await gk.contestStatus(epochNumber, resource)).toString();
  console.log('status', status);

  if (status !== ContestStatus.Finalized) {
    console.log('Contest for token capacitor has not been finalized.');
  }

  // get requests corresponding to the winning slate
  const winner = await gk.getWinningSlate(epochNumber, resource);
  console.log('Winning slate: ', winner.toString());

  // get requests
  const requestIDs = (await gk.slateRequests(winner)).map(r => r.toString());
  console.log('REQUESTS', requestIDs);

  const proposalIDs = await getProposalsForRequests(resource, requestIDs).then(proposals =>
    proposals.map(p => p.proposalID)
  );
  console.log('PROPOSALS', proposalIDs);

  // Get the unexecuted proposals
  const allProposals: any[] = await Promise.all(
    proposalIDs.map(async id => {
      const proposal = await capacitor.proposals(id);
      return { ...proposal, proposalID: id };
    })
  );
  // console.log('all', allProposals);
  const unexecutedProposals: any[] = allProposals.filter(
    (p: { withdrawn: boolean }) => !p.withdrawn
  );
  // console.log(unexecutedProposals);
  console.log(`${unexecutedProposals.length} grants to withdraw`);

  // functions that each take a nonce
  const tasks = unexecutedProposals.map(proposal => {
    const { tokens, to } = proposal;

    return async nonce => {
      console.log(`> Withdrawing ${tokens.toString()} tokens for ${to}`);
      const tx = await capacitor.withdrawTokens(proposal.proposalID, { gasPrice, nonce });

      console.log(tx.hash);
      await tx.wait();
    };
  });

  await sequenceNonces(provider, wallet, tasks);
}

// Execute a set of functions in sequence passing the sequential nonces
async function sequenceNonces(provider, wallet: ethers.Wallet, asyncFuncs) {
  // https://github.com/ethers-io/ethers.js/issues/435#issuecomment-467284296
  let baseNonce = provider.getTransactionCount(wallet.getAddress());
  let nonceOffset = 0;
  function getNonce() {
    return baseNonce.then(nonce => nonce + nonceOffset++);
  }

  for (let fn of asyncFuncs) {
    const nonce = await getNonce();

    await fn(nonce);
  }
}

async function run() {
  const {
    provider,
    gatekeeper: ROGatekeeper,
    tokenCapacitor,
    parameterStore,
  } = await getContracts();
  const mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
  const wallet = new ethers.Wallet(mnemonicWallet.privateKey, provider);
  const gatekeeper = ROGatekeeper.connect(wallet);

  // NOTE: make sure you are running this script during +1 epoch of the one you are finalizing
  const epochNumber = (await gatekeeper.functions.currentEpochNumber()).sub(1);
  console.log('epochNumber:', epochNumber.toString());
  console.log();
  const resources = [tokenCapacitor.address, parameterStore.address];

  // Finalize contests
  try {
    console.log('Finalizing ballots for all categories...');
    const finalizeAllCategories = resources.map((resource, index) =>
      finalize(gatekeeper, epochNumber, resource, index)
    );
    await Promise.all(finalizeAllCategories);
    console.log('DONE');
  } catch (error) {
    console.error(error);
  }

  // Execute proposals
  try {
    await new Promise(resolve => {
      console.log();
      rl.question('Do you want to execute proposals? [y/N]', async answer => {
        if (answer === 'y') {
          console.log('Disbursing grants');
          const writeTokenCapacitor = tokenCapacitor.connect(wallet);
          await disburseGrants(wallet, provider, gatekeeper, writeTokenCapacitor, epochNumber);

          // TODO: call setValue
        } else {
          console.log('Not executing proposals');
        }

        resolve();
      });
    });
  } catch (error) {
    console.error(error);
  }

  // TODO: donate challenger stakes
  // TODO: withdraw stake

  rl.close();
  process.exit(0);
}

run();
