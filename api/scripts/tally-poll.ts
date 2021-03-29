import axios from 'axios';
import Bottleneck from 'bottleneck';
import { ethers, BigNumber, Contract } from 'ethers';
import * as yargs from 'yargs';
import * as csvParse from 'csv-parse';
import * as stringify from 'csv-stringify/lib/sync';
import { getDefaultProvider } from 'zksync';
import * as fs from 'fs';
import * as path from 'path';

import { responseCount, getPollByID, getCategories } from '../src/utils/polls';
import { getContracts, contractABIs, checkConnection } from '../src/utils/eth';

const { CategoryPollResponse, CategoryPollAllocation } = require('../src/models');

const BLOCKSCOUT_XDAI = 'https://blockscout.com/poa/xdai/api/';
const BLOCKSCOUT_MATIC = 'https://explorer-mainnet.maticvigil.com/api/';
const TOKEN_ADDRESS_XDAI = '0x981fB9BA94078a2275A8fc906898ea107B9462A8';
const TOKEN_ADDRESS_MATIC = '0xe9949106f0777e7A2e36df891d59583AC94dc896';

function prettyToken(amount: BigNumber) {
  return ethers.utils.commify(ethers.utils.formatUnits(amount.toString(), 18));
}

function responsesToCSV(data, categories) {
  const rows = data.reduce((acc, item) => {
    const allocations = item.allocations.map(allocation => [
      item.account,
      ethers.utils.formatUnits(item.mainnetBalance.toString(), 18),
      ethers.utils.formatUnits(item.zkSyncBalance.toString(), 18),
      ethers.utils.formatUnits(item.xDaiBalance.toString(), 18),
      ethers.utils.formatUnits(item.maticBalance.toString(), 18),
      ethers.utils.formatUnits(item.balance.toString(), 18),
      allocation.points,
      allocation.categoryID,
      categories[allocation.categoryID].displayName,
      allocation.manual ? 'manual' : 'interface',
    ]);
    return acc.concat(allocations);
  }, []);
  return stringify(
    rows.filter(row => row[6] > 0),
    {
      header: true,
      columns: [
        'Address',
        'Mainnet Balance',
        'zkSync Balance',
        'xDai Balance',
        'Matic Balance',
        'Balance',
        'Points',
        'Category ID',
        'Category',
        'Source',
      ],
    }
  );
}

function getManualResponses(responsesFilename): Promise<any> {
  return new Promise((resolve, reject) => {
    const responses = [];
    fs.createReadStream(path.resolve('./', responsesFilename))
      .pipe(csvParse({ columns: true }))
      .on('data', row => {
        responses.push(row);
      })
      .on('end', () => resolve(responses));
  });
}

const zkSyncLimiter = new Bottleneck({
  maxConcurrent: 5,
  minTime: 100,
});

async function getZkSyncAccountBalance(address) {
  const provider = await getDefaultProvider('mainnet');
  const accountState = await zkSyncLimiter.schedule(() => provider.getState(address));
  const balance = accountState.verified.balances.PAN;
  console.log(`Got zksync balance for ${address}`);
  return BigNumber.from(balance || 0);
}

async function getBlockscoutAccountBalance(blockscoutUrl, tokenAddress, address) {
  return axios({
    method: 'get',
    url: blockscoutUrl,
    params: {
      module: 'account',
      action: 'tokenbalance',
      contractaddress: tokenAddress,
      address,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    console.log(`Got blockscout balance for ${address}`);
    return BigNumber.from(response.data.result);
  });
}

async function getAccountBalances(token, address) {
  console.log(`Getting balances for ${address}`);
  const balancePromises = [
    (async () => {
      const balance = await token.balanceOf(address);
      console.log(`Got mainnet balance for ${address}`);
      return balance;
    })(),
    getZkSyncAccountBalance(address),
    getBlockscoutAccountBalance(BLOCKSCOUT_XDAI, TOKEN_ADDRESS_XDAI, address),
    getBlockscoutAccountBalance(BLOCKSCOUT_MATIC, TOKEN_ADDRESS_MATIC, address),
  ];
  return Promise.all(balancePromises).then(
    ([mainnetBalance, zkSyncBalance, xDaiBalance, maticBalance]) => {
      console.log(`Got all balances for ${address}`);
      const totalBalance = [mainnetBalance, zkSyncBalance, xDaiBalance, maticBalance].reduce(
        (a, b) => a.add(b),
        BigNumber.from(0)
      );
      return {
        mainnetBalance,
        zkSyncBalance,
        xDaiBalance,
        maticBalance,
        balance: totalBalance,
        prettyBalance: prettyToken(totalBalance),
      };
    }
  );
}

interface Tally {
  total: BigNumber;
  nonZeroResponses: number;
}

async function run() {
  // Parse arguments
  const argv = yargs
    .scriptName('tally-poll')
    .default('pollID', 1)
    .options('manual-responses', {
      describe: 'path to a CSV file with defaults responses for each address',
    })
    .help().argv;

  const pollID: number = argv.pollID;
  if (typeof pollID !== 'number') {
    console.error('pollID must be a number');
    process.exit(1);
  }

  // connect
  const { provider, gatekeeper, network } = await getContracts();
  const blockNumber = await checkConnection();
  console.log(`We are on network ${network.chainId}, block number ${blockNumber}`);

  const tokenAddress = await gatekeeper.token();
  const token = new Contract(tokenAddress, contractABIs.BasicToken.abi, provider);
  console.log('Token at', token.address);

  console.log('Tallying votes for poll', pollID);

  const responses = await CategoryPollResponse.findAll({
    where: { pollID },
    include: [{ model: CategoryPollAllocation, as: 'allocations' }],
  });
  // console.log(responses);

  // Get the category details
  const categories = await getCategories().then(cats => {
    return cats.reduce((previous, current) => {
      previous[current.id] = current;
      return previous;
    }, {});
  });
  const categoriesByName = Object.keys(categories).reduce((acc, categoryID) => {
    acc[categories[categoryID].displayName] = categories[categoryID];
    return acc;
  }, {});

  const data = [];
  for (const response of responses) {
    const plainResponse = await response.get({ plain: true });
    const balances = await getAccountBalances(token, response.account);
    data.push({ ...plainResponse, ...balances });
  }

  if (argv.manualResponses) {
    const submittedStakers = new Set(data.map((x: any) => ethers.utils.getAddress(x.account)));
    const manualResponses = await getManualResponses(argv.manualResponses);
    console.log('Getting balances for manual responses...');
    for (const response of manualResponses) {
      if (submittedStakers.has(ethers.utils.getAddress(response['Address']))) continue;
      submittedStakers.add(ethers.utils.getAddress(response['Address']));
      const balances = await getAccountBalances(token, response['Address']);
      data.push({
        ...balances,
        pollID,
        account: response['Address'],
        allocations: [
          {
            categoryID: categoriesByName[response['Category']].id,
            points: response['Points'] || 100,
            manual: true,
          },
        ],
      });
    }
    console.log('Got all balances for manual responses');
  }

  const initialTotal: Tally = {
    total: BigNumber.from(0),
    nonZeroResponses: 0,
  };

  const tally: any = data.reduce((previous: Tally, current: any): Tally => {
    const updated = Object.assign({}, previous);
    const { account, balance, allocations } = current;

    console.log('tallying', account, allocations.length);
    console.log('balance', prettyToken(balance));

    current.allocations.forEach(allocation => {
      const { categoryID, points } = allocation;

      const weightedPoints = balance.mul(points).div(100);
      // console.log(allocation);
      const currentPoints: BigNumber = updated[categoryID];
      if (currentPoints != null) {
        updated[categoryID] = currentPoints.add(weightedPoints);
      } else {
        updated[categoryID] = weightedPoints;
      }
      console.log(
        `> points for ${categoryID}: ${points} (${prettyToken(weightedPoints)}) -> ${prettyToken(
          updated[categoryID]
        )}`
      );
    });
    console.log();

    const { nonZeroResponses, total } = previous;
    const updatedNonZeroResponses = balance.gt(0) ? nonZeroResponses + 1 : nonZeroResponses;
    return { ...updated, total: total.add(balance), nonZeroResponses: updatedNonZeroResponses };
  }, initialTotal);
  const displayTotal = ethers.utils.commify(ethers.utils.formatUnits(tally.total.toString(), 18));

  const count = await responseCount(pollID);

  const finalTally = {
    ...tally,
    count,
    displayTotal,
    weightedTotal: tally.total,
  };

  const categoryKeys = Object.keys(finalTally).filter(key => parseInt(key));

  // Display results
  const poll = await getPollByID(pollID);
  if (poll == null) {
    console.log(`Poll with ID ${pollID} was not found`);
    process.exit(0);
  }

  console.log(finalTally);

  console.log();
  console.log('='.repeat(80));
  console.log(`Results for poll ${pollID} - "${poll.name}":`);
  console.log(new Date());
  console.log(`${count} responses received`);
  console.log(`${finalTally.nonZeroResponses} with nonzero balance`);
  console.log(`total weight ${displayTotal} PAN`);

  // Display table and JSON
  const categoryJSON = {};
  categoryKeys.forEach(async key => {
    const categoryID = parseInt(key);

    if (!Number.isNaN(categoryID)) {
      const weight: BigNumber = finalTally[key];
      const category = categories[key];
      const percentage = weight.mul(100).div(finalTally.weightedTotal);
      console.log(`${key}\t${category.displayName}\t${prettyToken(weight)} (${percentage}%)`);
      categoryJSON[categoryID] = {
        id: categoryID,
        name: category.displayName,
        weight: ethers.utils.formatUnits(weight, 18),
      };
    }
  });

  console.log(JSON.stringify(categoryJSON, null, 2));

  const responsesCsv = responsesToCSV(data, categories);
  fs.writeFileSync(
    `responses-poll-${pollID}-${new Date().toISOString().slice(0, 10)}.csv`,
    responsesCsv
  );

  process.exit(0);
}

run();
