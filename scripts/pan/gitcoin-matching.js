const axios = require('axios');
const ethers = require('ethers');
const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse');
const stringify = require('csv-stringify/lib/sync');

const MATCHING_BUDGET = 1369935.62;
const ONE_DOLLAR_PAN = 11.31;
const GITCOIN_ADDRESS = '0x00De4B13153673BCAE2616b67bf822500d325Fc3';
const ZKSYNC_ADDRESS = '0xaBEA9132b05A70803a4E85094fD0e1800777fBEF';
const IGNORED_ADDRESSES = new Set([
  '0xF53bBFBff01c50F2D42D542b09637DcA97935fF7', // Uniswap
  '0x1b21609d42fa32f371f58df294ed25b2d2e5c8ba', // Uniswap v2
  '0x6F400810b62df8E13fded51bE75fF5393eaa841F', // dFusion
  '0x11111254369792b2Ca5d084aB5eEA397cA8fa48B', // 1inch.exchange
]);
const IGNORED_SENDERS = new Set([
  '0xcd2E72aEBe2A203b84f46DEEC948E6465dB51c75', // Alice transfer
  '0xB320759d1A0ADbE55360a0a28a221013aA2DA4fC', // LevelK transfer
  '0x7117fb4E85286c159EFa691a7699587Ccd01E26E', // LevelK transfer
  '0x3eCb4bf3A4C483cA0A4C897396E1FD85b48FB129',
  '0x6c645C934B7f5eC7589F3d96192000E5ABAbF90F', // MetaCartel
]);
const IGNORED_TXHASHES = new Set([
  '0x873dcaaaf4625e2aefcae5ae30a144fe00caff3076d44eff1579d9a643b9efca',
  '0x652733b11f9b2716b34774e5f10aac39aa5e4b4c2bc77fe1335841ae75f707d9',
  '0x3a08cee8abb05d31bcdfe78329cc161f9e715ced06020d23eed0daf14e02c918',
]);

const ENS_ADDRESSES = {
  'contraktorapp.eth': '0x1e52C0887bc0F752368dFb80974ec988Ab40AED3',
  'daiparaprincipiantes.eth': '0x333E08D7C12ABf223789dC00305C4FE3e8B4b956',
  'specie.eth': '0x32672af4edc13cf1ab5dab6c5cda5df71ad35951',
  'nazariy.eth': '0xE73E7eEfDacc89069DE5B7757830FcF1D7DdAcD2',
  '1HNa1bzkViHVkCnhYzHyB8r1eurbbCsTAS': '0x0',
  'eth:0x03add42d442ae2ab4a763c28e5ae1bc016840a12': '0x03add42d442ae2ab4a763c28e5ae1bc016840a12',
  'etherchest.eth': '0x007e60C669cf96dC32655d1Eb1c1eBcf96459975',
  'tomotouch.eth': '0xA211e2FCbae4f3D5d0f74e7156cdbA795fEc2EE7',
  '@enzosumo': '0x0',
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
    ];
  });

  const data = stringify(rows, { header: true, columns: [
    'Donor', 'Donor Address', 'Grant', 'Grant Address', 'Donated Tokens', 'Donated Value', 'Time'] });
  return data;
}

async function getGrantAddresses() {
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
      }, {});
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

async function getZksyncTransactions(addresses) {
  const seenTxhashes = new Set();
  const transactions = await addresses.reduce((accumulatorPromise, address) => {
    return accumulatorPromise.then(accumulator => {
      return axios({
        method: 'get',
        url: `https://api.zksync.io/api/v0.1/account/${address}/history/older_than`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (response.status === 200) {
          if (response.data.length >= 100) {
            console.log(`WARNING: Account ${address} seems to have more than 100 zksync transactions, but pagination hasn't been implemented to fetch them.`);
          }
          // For zkSync, we assume that each token transfer has a unique hash. Note that this is NOT true for mainnet transactions.
          const newTransactions = response.data.filter(x => !seenTxhashes.has(x.hash));
          newTransactions.forEach(x => seenTxhashes.add(x.hash));
          return accumulator.concat(newTransactions);
        }
        // TODO: handle response status
        throw new Error('unhandled response status');
      }).catch(error => {
        console.log('error:', error);
        throw error;
      });
    });
  }, Promise.resolve([]));
  const panTransactions = transactions.filter(x => x.tx.token === 'PAN');
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
  const zksyncAddresses = mainnetTransactions.reduce((acc, tx) => {
    if (ethers.utils.getAddress(tx['To']) === ZKSYNC_ADDRESS) {
      acc.add(ethers.utils.getAddress(tx['From']));
    }
    return acc;
  }, new Set());
  console.log('zkSync users', zksyncAddresses);
  const zksyncTransactions = await getZksyncTransactions(
    Array.from(zksyncAddresses.values())
      .concat(Object.values(LEAGUE_ADDRESSES))
  );
  const transactions = mainnetTransactions.concat(zksyncTransactions);
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
}
