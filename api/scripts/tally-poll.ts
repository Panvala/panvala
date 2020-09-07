import { Contract } from 'ethers';
import { BigNumber, bigNumberify, formatUnits, commify } from 'ethers/utils';
import * as yargs from 'yargs';
//import * as csvParse from 'csv-parse';
import * as stringify from 'csv-stringify/lib/sync';
import * as fs from 'fs';

import { responseCount, getPollByID, getCategories } from '../src/utils/polls';
import { getContracts, contractABIs, checkConnection } from '../src/utils/eth';

const { CategoryPollResponse, CategoryPollAllocation } = require('../src/models');

const KNOWN_STAKERS = [
  // 7: Hashing it Out
  {
    categoryID: 7,
    address: '0xD27d1a5EB9D95228f0b5e2F18A15E801f1E4FdFD',
  },
  {
    categoryID: 7,
    address: '0xE6A39d977301A57a8a77E7F33a187E259aDc81b3',
  },
  {
    categoryID: 7,
    address: '0x197553ddfdb7b9c3c4216e2914456788bfd59c86',
  },
  {
    categoryID: 7,
    address: '0xC33F220195BbB4F39495758F35827C602528fc83',
  },
  // 8: Commons Stack
  {
    categoryID: 8,
    address: '0x839395e20bbB182fa440d08F850E6c7A8f6F0780',
  },
  {
    categoryID: 8,
    address: '0xB3e43abf014cb2d8cF8dc3D8C2e62157E6093343',
  },
  {
    categoryID: 8,
    address: '0x60e18f4971077412af2bd0297999093642f28e15',
  },
  // 9: DAppNode
  {
    categoryID: 9,
    address: '0x8C5ceCb20105A90C383f25914933F01fb2e94916',
  },
  {
    categoryID: 9,
    address: '0x54756dCBe2a9945F35B614031f6B2fA39d53BB90',
  },
  // 10: MetaCartel
  {
    categoryID: 10,
    address: '0xafdD1eB2511cd891AcF2bFf82DABf47E0C914d24',
  },
  {
    categoryID: 10,
    address: '0xD25185f8c3B9e38C3f014378CE58B362Db568352',
  },
  // 11: DXdao
  {
    categoryID: 11,
    address: '0x519b70055af55a007110b4ff99b0ea33071c720a',
  },
];

function prettyToken(amount: BigNumber) {
  return commify(formatUnits(amount.toString(), 18));
}

function responsesToCSV(data, categories) {
  const rows = data.reduce((acc, item) => {
    const allocations = item.allocations.map(allocation => [
      item.account,
      formatUnits(item.balance.toString(), 18),
      allocation.points,
      allocation.categoryID,
      categories[allocation.categoryID].displayName,
    ]);
    return acc.concat(allocations);
  }, []);
  return stringify(
    rows.filter(row => row[2] > 0),
    { header: true, columns: ['Address', 'Balance', 'Points', 'Category ID', 'Category Name'] }
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

  const data = await Promise.all(
    responses.map(async response => {
      const plainResponse = await response.get({ plain: true });
      console.log(plainResponse);
      return token.balanceOf(response.account).then(balance => {
        return { ...plainResponse, balance, prettyBalance: prettyToken(balance) };
      });
    })
  );
  // console.log(data);

  if (pollID === 3) {
    const submittedStakers = new Set(data.map((x: any) => x.account));
    await Promise.all(
      KNOWN_STAKERS.map(async knownStaker => {
        if (submittedStakers.has(knownStaker.address)) return;

        const balance = await token.balanceOf(knownStaker.address);
        data.push({
          pollID: 3,
          account: knownStaker.address,
          balance,
          prettyBalance: prettyToken(balance),
          allocations: [
            {
              categoryID: knownStaker.categoryID,
              points: 100,
            },
          ],
        });
      })
    );
  }

  const initialTotal: Tally = {
    total: bigNumberify(0),
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
  const displayTotal = commify(formatUnits(tally.total.toString(), 18));

  const count = await responseCount(pollID);

  const finalTally = {
    ...tally,
    count,
    displayTotal,
    weightedTotal: tally.total,
  };

  const categoryKeys = Object.keys(finalTally).filter(key => parseInt(key));

  // Get the category details
  const categories = await getCategories().then(cats => {
    return cats.reduce((previous, current) => {
      previous[current.id] = current;
      return previous;
    }, {});
  });

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

  // Display table
  categoryKeys.forEach(async key => {
    const categoryID = parseInt(key);

    if (!Number.isNaN(categoryID)) {
      const weight: BigNumber = finalTally[key];
      const category = categories[key];
      const percentage = weight.mul(100).div(finalTally.weightedTotal);
      console.log(`${key}\t${category.displayName}\t${prettyToken(weight)} (${percentage}%)`);
    }
  });

  const responsesCsv = responsesToCSV(data, categories);
  fs.writeFileSync(
    `responses-poll-${pollID}-${new Date().toISOString().slice(0, 10)}.csv`,
    responsesCsv
  );

  process.exit(0);
}

run();
