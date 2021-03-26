const axios = require('axios');
const ethers = require('ethers');
const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse');
const stringify = require('csv-stringify/lib/sync');

const MATCHING_BUDGET = 1369935.62;
const ONE_DOLLAR_PAN = 11.31;
const DONATIONS_STARTED_AT = Date.parse('2021-01-01');
const GITCOIN_ADDRESS = '0x00De4B13153673BCAE2616b67bf822500d325Fc3';
const ZKSYNC_ADDRESSES = new Set([
  '0xaBEA9132b05A70803a4E85094fD0e1800777fBEF',
  '0x9D37F793E5eD4EbD66d62D505684CD9f756504F6',
]);
const IGNORED_ADDRESSES = new Set([
  '0x0000000000000000000000000000000000000000', // Minting address for bridges
  '0xF53bBFBff01c50F2D42D542b09637DcA97935fF7', // Uniswap
  '0x1b21609D42fa32F371F58DF294eD25b2D2e5C8ba', // Uniswap v2
  '0x6F400810b62df8E13fded51bE75fF5393eaa841F', // dFusion
  '0x11111254369792b2Ca5d084aB5eEA397cA8fa48B', // 1inch.exchange
  '0xe069CB01D06bA617bCDf789bf2ff0D5E5ca20C71', // 1inch.exchange
  '0x1c5b75Aa581b3DbBF3E5Fd2A76D9c40dbb4ABa55', // TREERewards
  '0xD152f549545093347A162Dce210e7293f1452150', // Disperse.app
]);
const IGNORED_SENDERS = new Set([
  ...ZKSYNC_ADDRESSES,
  '0xcd2E72aEBe2A203b84f46DEEC948E6465dB51c75', // Alice transfer
  '0xB320759d1A0ADbE55360a0a28a221013aA2DA4fC', // LevelK transfer
  '0x7117fb4E85286c159EFa691a7699587Ccd01E26E', // LevelK transfer
  '0x3eCb4bf3A4C483cA0A4C897396E1FD85b48FB129',
  '0x6c645C934B7f5eC7589F3d96192000E5ABAbF90F', // MetaCartel
  '0x47aE9FaF3AbeA7b2acAC69aB0A7B939201FeA5F6', // Panvala Fellows
  '0xe44f10A925411A3a0086E5EDba8A4399C6F75ad6', // Panvala Activities Fund
  '0x64853bb1fe38d2a1e1ef5cefd3c109e874628ff5', // Yalor
]);
const IGNORED_TXHASHES = new Set([
  '0x873dcaaaf4625e2aefcae5ae30a144fe00caff3076d44eff1579d9a643b9efca',
  '0x652733b11f9b2716b34774e5f10aac39aa5e4b4c2bc77fe1335841ae75f707d9',
  '0x3a08cee8abb05d31bcdfe78329cc161f9e715ced06020d23eed0daf14e02c918',
  '0x75bb5594e81cafa30a5ab16425520b8d2acba7fd3141f6534cb207db14f51e64',
  '0x9112ac92409134ec473aae17c9786e2c48dde22a680ed5dc55701d13e94b7660',
  '0x7893c4294100158b91dc68a8cc661df29b71d61103430dc158002f9fe23e3909', // Commons Stack Community Fund distribution
  '0xf8e8564d11249ea38df9ef7e1c8dd215ae45e983b9ba5dae4a8830b44d4d5eb5', // Commons Stack Community Fund distribution
  '0x98bb29bf1323645e2fbf53da792691f4b01a6c4de44291724c08f09587f298e3', // MetaCartel Builder Awards distribution
  '0xd4a313038f635b0b71cec28099534e7461bec2bfd5fab0c2b69cfcd52b57daae', // KERNEL address change
  '0x93967255d299bb139f7ea3b7f8d35ec793e8fe57896f43972916569b5dcc83d9', // Meta Gamma Delta address change
  '0x92f334cb1a0312410bf36f277786115c9b1073a96547267b58da999166fff7a0', // Meta Gamma Delta address change
  '0x910c626d89cc9ff23123f77b57178c7d1c225929fa9a9bbd9d53e5ab67df3f25', // KERNEL to Meta Gamma Delta
  '0xde72f81e8aacb332db6cdc32e022fbf72edfcfa10e71e6f6e6aa77638fe5b2b0', // LexDAO
]);

const ENS_ADDRESSES = {
  'contraktorapp.eth': '0x1e52C0887bc0F752368dFb80974ec988Ab40AED3',
  'daiparaprincipiantes.eth': '0x333E08D7C12ABf223789dC00305C4FE3e8B4b956',
  'specie.eth': '0x32672af4edc13cf1ab5dab6c5cda5df71ad35951',
  'nazariy.eth': '0xE73E7eEfDacc89069DE5B7757830FcF1D7DdAcD2',
  '1HNa1bzkViHVkCnhYzHyB8r1eurbbCsTAS': '0x0000000000000000000000000000000000000000',
  'eth:0x03add42d442ae2ab4a763c28e5ae1bc016840a12': '0x03add42d442ae2ab4a763c28e5ae1bc016840a12',
  'etherchest.eth': '0x007e60C669cf96dC32655d1Eb1c1eBcf96459975',
  'tomotouch.eth': '0xA211e2FCbae4f3D5d0f74e7156cdbA795fEc2EE7',
  '@enzosumo': '0x0000000000000000000000000000000000000000',
  ' 0xEbC1209aB9D75e64615601D0554fa443D24494Fe': '0xEbC1209aB9D75e64615601D0554fa443D24494Fe',
  '0x0': '0x0000000000000000000000000000000000000000',
  '': '0x0000000000000000000000000000000000000000',
  '1x1': '0x0000000000000000000000000000000000000000',
  null: '0x0000000000000000000000000000000000000000',
  'ryanb.eth': '0x56329ACd726a373177f8Bf2f94Ca601C0BB3C4FA',
  ' 0x93f3f612a525a59523e91cc5552f718df9fc0746': '0x93f3f612a525a59523e91cc5552f718df9fc0746',
  'deffo.xyz': '0x0000000000000000000000000000000000000000',
  'jabyl.eth': '0x207ac8e8b2Db9BeC1B53176f26fC16c349363309',
  '123567890': '0x0000000000000000000000000000000000000000',
  'ih0dl.eth': '0x49E5C693dC0cC586B6e29E2404B17dc0565Ac12B',
  'rtbynelly': '0x0000000000000000000000000000000000000000',
  'https://etherscan.io/address/0x4aadd19eab55b09281e': '0x0000000000000000000000000000000000000000',
  '0x78eE8F02653e8Fb65f078Fe22D26eC0B91d0943': '0x0000000000000000000000000000000000000000',
  '0.00000088': '0x0000000000000000000000000000000000000000',
  '37Q2dixQJUr5dUHYHCirfntByV4pvsvKHX': '0x0000000000000000000000000000000000000000',
  '0x01972': '0x0000000000000000000000000000000000000000',
};

const LEAGUE_ADDRESSES = {
  "Hashing it Out": "0x05dF81Bf098Ae29AfAd54250Cd224379eDCae850",
  "Commons Stack": "0x1251A94b6d800979d2d933b8Bd5914b892772Ac6",
  "DAppNode": "0x00CF36853AA4024fb5BF5cc377dfd85844B411a0",
  "MetaCartel": "0xD91ec22114897E5E68997F77a6182dE3Cb09ba9B",
  "DXdao": "0x466621C1771590c4ECc5314eB3055adAFd980d52",
  "Meta Gamma Delta": "0x694c7CA85584d550B36c044E10D3A7b30d85E7F7",
  "KERNEL": "0xC728DEa8B2972E6e07493BE8DC2F0314F7dC3E98",
  "future modern": "0x5ab45FB874701d910140e58EA62518566709c408",
  "DePo DAO": "0x3792acDf2A8658FBaDe0ea70C47b89cB7777A5a5",
}

const BLOCKSCOUT_XDAI = 'https://blockscout.com/poa/xdai/api/';
const XDAI_ADDRESSES = {
  "Shenanigan": "0x5A9CE898f0B03c5A3Cd2d0c727efdD0555C86f81",
  "Austin Meetups Fund": "0x07294360e0bb89eBbE3542c478A8d1F6840ee2eE",
  "future modern": "0x5ab45FB874701d910140e58EA62518566709c408",
  "Hashing it Out": "0xe027688a57c4A6Fb2708343cF330aaeB8fe594bb",
  "Trips Community": "0x2C5FF0Be38115Fe6E37ACce8e94F86186c3D73dF",
};

const BLOCKSCOUT_MATIC = 'https://explorer-mainnet.maticvigil.com/api/';
const MATIC_ADDRESSES = {
  "Blockchain Education Network": "0x66Aa8Bee5366b6b48811AE0Dac9Fe5e1EEfE1621",
  "Matic Mitra": "0xd9D66f6eB790c82A1e98CDa99C153983461A3725",
};

const seenTxhashes = new Set();
let zksyncErrors = 0;

run();



function grantsToCSV(grants) {
  const rows = Object.entries(grants).map(([address, data]) => {
    return [
      data.name,
      address,
      data.tokens,
      data.tokens / ONE_DOLLAR_PAN,
      data.transactions,
      data.matches['Unconstrained'],
      data.matches['$1 Match'],
      data.matches['Fully Allocated'],
      data.matches['Fully Allocated USD'],
    ];
  });

  const data = stringify(rows, { header: true, columns: [
    'Grant', 'Address', 'Donated Tokens', 'Donated Value', 'Donation Count', 'Quadratic Match', '$1 Match (USD)', '1.5M PAN Allocated', 'Matching Value'] });
  return data;
}

function donorsToCSV(donors) {
  const rows = Object.entries(donors).map(([address, data]) => {
    return [data.name, address, data.tokens, data.transactions];
  });

  const data = stringify(rows, { header: true, columns: ['Donor', 'Address', 'Donated Tokens', 'Donation Count'] });
  return data;
}

function donationsToCSV(grants, donors) {
  const donations = Object.entries(grants).reduce((allDonations, [grantAddress, grant]) => {
    grantDonations = Object.entries(grant.donations).map(([donorAddress, donationAmount]) => {
      return {
        grant: {...grant, address: grantAddress},
        donor: {...donors[donorAddress], address: donorAddress}
      };
    });
    return allDonations.concat(grantDonations);
  }, []);
  const rows = donations.map(donation => {
    return [
      donation.donor.name,
      donation.donor.address,
      donation.grant.name,
      donation.grant.address,
      donation.grant.donations[donation.donor.address],
      donation.grant.donations[donation.donor.address] / ONE_DOLLAR_PAN,
      donation.donor.projects[donation.grant.address].time,
      donation.donor.projects[donation.grant.address].txhash,
    ];
  });

  const data = stringify(rows, { header: true, columns: [
    'Donor', 'Donor Address', 'Grant', 'Grant Address', 'Donated Tokens', 'Donated Value', 'Time', 'Txhash'] });
  return data;
}

async function getGrantAddresses() {
  const initialGrantAddresses = {};
  Object.entries(XDAI_ADDRESSES).forEach(([name, address]) => initialGrantAddresses[address] = name);
  Object.entries(MATIC_ADDRESSES).forEach(([name, address]) => initialGrantAddresses[address] = name);

  try {
    const response = await axios({
      method: 'get',
      url: 'https://gitcoin.co/grants/grants.json',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.data.reduce((accumulator, item) => {
        const address = ENS_ADDRESSES[item[1]] || ethers.utils.getAddress(item[1]);
        accumulator[address] = item[0];
        return accumulator;
      }, initialGrantAddresses);
    }
    // TODO: handle response status
    return response;
  } catch (error) {
    console.log('error:', error);
    throw error;
  }
}

function getTransactions() {
  return new Promise((resolve, reject) => {
    const transactions = [];
    const currentDir = path.resolve(__dirname);
    const readDir = `${currentDir}`;
    fs.createReadStream(`${readDir}/pan-transfers.csv`)
      .pipe(csvParse({columns: true}))
      .on('data', row => {
        transactions.push(row);
      })
      .on('end', () => resolve(transactions));
  });
}

async function fetchZksyncPages(address, olderThan = null) {
  console.log('zksync fetch', address, olderThan);
  return axios({
    method: 'get',
    url: `https://api.zksync.io/api/v0.1/account/${address}/history/older_than`,
    params: {
      tx_id: olderThan,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (response.status === 200) {
      if (response.data.length >= 100) {
        if (!response.data[response.data.length - 1].success) {
          console.log(`WARNING ${address}: Tried to paginate off of a failed transaction, which does not work. Some transactions might have been missed`)
          return response.data;
        }
        return fetchZksyncPages(address, response.data[response.data.length - 1].tx_id)
          .then(morePages => response.data.concat(morePages));
      } else {
        return response.data;
      }
    }
    // TODO: handle response status
    throw new Error('unhandled response status');
  }).catch(error => {
    console.log(`ERROR: zkSync fetch failed for ${address}`);
    zksyncErrors++;
    return [];
  });
}

async function getZksyncTransactionsInOrder(addresses) {
  return addresses.reduce((accumulatorPromise, address) => {
    return accumulatorPromise.then(accumulator => {
      return fetchZksyncPages(address).then(transactions => {
        // For zkSync, we assume that each token transfer has a unique hash. Note that this is NOT true for mainnet transactions.
        const newTransactions = transactions.filter(x => !seenTxhashes.has(x.hash));
        newTransactions.forEach(x => seenTxhashes.add(x.hash));
        return accumulator.concat(newTransactions);
      }).catch(error => {
        console.log('error:', error);
        throw error;
      });
    });
  }, Promise.resolve([]));
}

async function getZksyncTransactionsInParallel(addresses, count = 20) {
  const batches = [];
  for (let i = 0; i < count; i++) {
    batches.push([]);
  };
  addresses.forEach((address, i) => batches[i % count].push(address));
  return (await Promise.all(batches.map(batch => getZksyncTransactionsInOrder(batch)))).flat();
}


async function getZksyncTransactions(addresses) {
  const transactions = await getZksyncTransactionsInParallel(addresses);
  console.log('zksync transactions: ', transactions.length);
  const currentTransactions = transactions.filter(x => Date.parse(x.created_at) > DONATIONS_STARTED_AT);
  console.log(`donation period: ${DONATIONS_STARTED_AT} - ${Date.now()}`);
  console.log('zksync current transactions: ', currentTransactions.length);
  const panTransactions = currentTransactions.filter(x => x.tx.token === 'PAN' && x.tx.type !== 'ForcedExit');
  console.log('zksync PAN transactions: ', panTransactions.length);

  return panTransactions.map(transaction => {
    return {
      'Txhash': transaction['hash'],
      'To': ethers.utils.getAddress(transaction.tx['to']),
      'From': ethers.utils.getAddress(transaction.tx['from']),
      'Quantity': ethers.utils.formatEther(transaction.tx['amount']),
      'DateTime': transaction['created_at'],
    };
  });
}

async function getBlockscoutTransactionsForTransfers(blockscout_url, txhashes) {
  return txhashes.reduce((accumulatorPromise, txhash) => {
    return accumulatorPromise.then(accumulator => {
      return axios({
        method: 'get',
        url: blockscout_url,
        params: {
          module: 'transaction',
          action: 'gettxinfo',
          txhash,
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => {
        accumulator[txhash] = response.data.result;
        return accumulator;
      });
    });
  }, Promise.resolve({}));;
}

async function getBlockscoutTransfers(blockscout_url, addresses) {
  return addresses.reduce((accumulatorPromise, address) => {
    return accumulatorPromise.then(accumulator => {
      return axios({
        method: 'get',
        url: blockscout_url,
        params: {
          module: 'account',
          action: 'tokentx',
          address,
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => {
        const transfers = response.data.result;
        // Generate a unique ID for each transfer from the txhash and log index of the transfer.
        transfers.forEach(x => x.uniqueId = `${x.hash}-${x.logIndex}`)
        const newTransfers = transfers.filter(x => !seenTxhashes.has(x.uniqueId));
        newTransfers.forEach(x => seenTxhashes.add(x.uniqueId));
        return accumulator.concat(newTransfers);
      }).catch(error => {
        console.log('error:', error);
        throw error;
      });
    });
  }, Promise.resolve([]));
}

async function getBlockscoutTransactions(blockscout_url, addresses) {
  console.log('blockscout URL: ', blockscout_url);
  const transfers = await getBlockscoutTransfers(blockscout_url, addresses);
  console.log('blockscout transfers: ', transfers.length);
  const currentTransfers = transfers.filter(x => (new Date(parseInt(x.timeStamp) * 1000)) > DONATIONS_STARTED_AT);
  console.log('blockscout current transfers: ', currentTransfers.length);
  const panTransfers = currentTransfers.filter(x => x.tokenSymbol === 'PAN');
  console.log('blockscout PAN transactions: ', panTransfers.length);

  const transactionsByHash = await getBlockscoutTransactionsForTransfers(blockscout_url, panTransfers.map(x => x.hash));
  return panTransfers.map(transfer => {
    return {
      'Txhash': transfer.uniqueId,
      'To': ethers.utils.getAddress(transfer.to),
      // The from address on the transfer will be Uniswap in many cases. Get the from address from
      // the transaction containing the transfer.
      'From': ethers.utils.getAddress(transactionsByHash[transfer.hash].from),
      'Quantity': ethers.utils.formatEther(transfer.value),
      'DateTime': (new Date(parseInt(transfer.timeStamp * 1000))).toISOString(),
    };
  });
}

function getDonorNames() {
  return new Promise((resolve, reject) => {
    const donors = {};
    const currentDir = path.resolve(__dirname);
    const readDir = `${currentDir}`;
    fs.createReadStream(`${readDir}/pan-donors.csv`)
      .pipe(csvParse({columns: true}))
      .on('data', row => {
        const address = ethers.utils.getAddress(row['Address']);
        donors[address] = row['Donor'];
      })
      .on('end', () => resolve(donors));
  });
}

function calculateQuadraticTerm(donations) {
  const sumOfSquares = Object.values(donations).reduce((sum, donation) => sum + Math.sqrt(donation), 0);
  return Math.pow(sumOfSquares, 2);
}

function calculateMatching(grants) {
  let quadraticTotal = 0;
  let donationsTotal = 0;
  const gitcoinDonations = grants[GITCOIN_ADDRESS].tokens;

  Object.entries(grants).forEach(([address, grant]) => {
    donationsTotal += grant.tokens;
    grant.matches = grant.matches || {};
    if (address === GITCOIN_ADDRESS)
      return;
    // Pure quadratic funding subtracts the donated amount to calculate the subsidy. (The yellow area of
    // the square matching diagram here: https://vitalik.ca/general/2019/12/07/quadratic.html#quadratic-funding).
    // This matching calculation matches the donated amount as well, which produces better results with few donations.
    grant.matches['Unconstrained'] = calculateQuadraticTerm(grant.donations);
    quadraticTotal += grant.matches['Unconstrained'];
  });

  const averageMatch = MATCHING_BUDGET / donationsTotal;
  const tokensToAllocate = MATCHING_BUDGET - gitcoinDonations * (averageMatch - 1) - donationsTotal;
  Object.entries(grants).forEach(([address, grant]) => {
    grant.matches = grant.matches || {};
    if (address === GITCOIN_ADDRESS) {
      grant.matches['Fully Allocated'] = gitcoinDonations * (averageMatch - 1);
    } else {
      grant.matches['Fully Allocated'] = grant.matches['Unconstrained'] / quadraticTotal * tokensToAllocate;
    }
    grant.matches['Fully Allocated USD'] = grant.matches['Fully Allocated'] / ONE_DOLLAR_PAN;
  });

  Object.entries(grants).forEach(([address, grant]) => {
    if (address === GITCOIN_ADDRESS)
      return;
    grant.matches['$1 Match'] = (calculateQuadraticTerm({ ...grant.donations, JohnDoe: ONE_DOLLAR_PAN }) - grant.matches['Unconstrained']) / ONE_DOLLAR_PAN;
  });
}

async function run() {
  const grantNames = await getGrantAddresses();
  const mainnetTransactions = await getTransactions();
  /*
  const zksyncAddresses = mainnetTransactions.reduce((acc, tx) => {
    if (ZKSYNC_ADDRESSES.has(ethers.utils.getAddress(tx['To']))) {
      acc.add(ethers.utils.getAddress(tx['From']));
    }
    return acc;
  }, new Set());
  console.log('zkSync users', zksyncAddresses);
  */
  const zksyncAddresses = Object.keys(grantNames);
  const zksyncTransactions = await getZksyncTransactions(
    Array.from(zksyncAddresses.values())
      .concat(Object.values(LEAGUE_ADDRESSES))
  );

  const xdaiTransactions = await getBlockscoutTransactions(BLOCKSCOUT_XDAI, Object.values(XDAI_ADDRESSES));
  const maticTransactions = await getBlockscoutTransactions(BLOCKSCOUT_MATIC, Object.values(MATIC_ADDRESSES));

  const transactions = mainnetTransactions.concat(zksyncTransactions, xdaiTransactions, maticTransactions);

  const donorNames = await getDonorNames();

  const donors = {};
  const grants = {};

  transactions.forEach(item => {
    const grantAddress = ethers.utils.getAddress(item['To']);
    const donorAddress = ethers.utils.getAddress(item['From']);
    if (
      IGNORED_TXHASHES.has(item['Txhash']) ||
      IGNORED_ADDRESSES.has(grantAddress) ||
      IGNORED_ADDRESSES.has(donorAddress) ||
      IGNORED_SENDERS.has(donorAddress) ||
      !(new Set(Object.keys(grantNames))).has(grantAddress)
      ) {
      return;
    }

    const grant = grants[grantAddress] || {
      name: grantNames[grantAddress] || null,
      transactions: 0,
      tokens: 0,
      donations: {},
    };
    grant.transactions += 1;
    transactionTokens = parseFloat(item['Quantity']);
    grant.tokens += transactionTokens;
    grant.donations[donorAddress] = grant.donations[donorAddress] || 0;
    grant.donations[donorAddress] += transactionTokens;
    grants[grantAddress] = grant;

    const donor = donors[donorAddress] || {};
    donor.name = donorNames[donorAddress] || null;
    donor.transactions = (donor.transactions || 0) + 1;
    donor.tokens = parseFloat(item['Quantity']) + (donor.tokens || 0);
    donor.projects = donor.projects || {};
    donor.projects[grantAddress] = {
      name: grant.name || grantAddress,
      time: item['DateTime'],
      txhash: item['Txhash'],
    };
    donors[donorAddress] = donor;
  });

  /* Uncomment to list all Gitcoin Grants in the spreadsheet.
  Object.keys(grantNames).forEach(address => {
    grants[address] = grants[address] || {
      name: grantNames[address] || null,
      transactions: 0,
      tokens: 0,
      donations: {},
    };
  });
*/
  calculateMatching(grants);

  const grantsCsv = grantsToCSV(grants);
  fs.writeFileSync('gitcoin-grants.csv', grantsCsv);

  const donorsCsv = donorsToCSV(donors);
  fs.writeFileSync('gitcoin-donors.csv', donorsCsv);

  const donationsCsv = donationsToCSV(grants, donors);
  fs.writeFileSync('gitcoin-donations.csv', donationsCsv);

  console.log('zksync fetch errors:', zksyncErrors);
  console.log('CSV files written.')
}
