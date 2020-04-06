const axios = require('axios');
const ethers = require('ethers');
const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse');
const stringify = require('csv-stringify/lib/sync');

const MATCHING_BUDGET = 1500000;
const ONE_DOLLAR_PAN = 43.957; // 58.9;
const GITCOIN_ADDRESS = '0x00De4B13153673BCAE2616b67bf822500d325Fc3';
const IGNORED_ADDRESSES = new Set([
  '0xF53bBFBff01c50F2D42D542b09637DcA97935fF7', // Uniswap
  '0x6F400810b62df8E13fded51bE75fF5393eaa841F', // dFusion
  '0x11111254369792b2Ca5d084aB5eEA397cA8fa48B', // 1inch.exchange
  '0xcd2E72aEBe2A203b84f46DEEC948E6465dB51c75', // Alice transfer
]);

run();



function grantsToCSV(grants) {
  const rows = Object.entries(grants).map(([address, data]) => {
    return [data.name, address, data.tokens, data.transactions, data.matches['Unconstrained'], data.matches['$1 Match'], data.matches['Fully Allocated']];
  });

  const data = stringify(rows, { header: true, columns: ['Grant', 'Address', 'Donated Tokens', 'Donation Count', 'Quadratic Match', '$1 Match (USD)', '1.5M PAN Allocated'] });
  return data;
}

function donorsToCSV(donors) {
  const rows = Object.entries(donors).map(([address, data]) => {
    return [data.name, address, data.tokens, data.transactions];
  });

  const data = stringify(rows, { header: true, columns: ['Donor', 'Address', 'Donated Tokens', 'Donation Count'] });
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
        const address = ethers.utils.getAddress(item[1]);
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

function sumDonations(donations) {
  return Object.values(donations).reduce((sum, donation) => sum + donation, 0);
}

function calculateMatching(grants) {
  let quadraticTotal = 0;
  let donationsTotal = 0;
  const gitcoinDonations = sumDonations(grants[GITCOIN_ADDRESS].donations)
  
  Object.entries(grants).forEach(([address, grant]) => {
    donationsTotal += sumDonations(grant.donations);
    grant.matches = grant.matches || {};
    if (address === GITCOIN_ADDRESS)
      return;
    grant.matches['Unconstrained'] = calculateQuadraticTerm(grant.donations);
    quadraticTotal += grant.matches['Unconstrained'];
  });
  
  const averageMatch = MATCHING_BUDGET / donationsTotal;
  const tokensToAllocate = MATCHING_BUDGET - gitcoinDonations * (averageMatch - 1) - donationsTotal;
  Object.entries(grants).forEach(([address, grant]) => {
    grant.matches = grant.matches || {};
    if (address === GITCOIN_ADDRESS) {
      grant.matches['Fully Allocated'] = gitcoinDonations * (averageMatch - 1);
      return;
    }
    grant.matches['Fully Allocated'] = grant.matches['Unconstrained'] / quadraticTotal * tokensToAllocate;
  });
  
  Object.entries(grants).forEach(([address, grant]) => {
    if (address === GITCOIN_ADDRESS)
      return;
    grant.matches['$1 Match'] = (calculateQuadraticTerm({ ...grant.donations, JohnDoe: ONE_DOLLAR_PAN }) - grant.matches['Unconstrained']) / ONE_DOLLAR_PAN;
  });
}

async function run() {
  const grantNames = await getGrantAddresses();
  const transactions = await getTransactions();
  const donorNames = await getDonorNames();
  
  const donors = {};
  const grants = {};
  
  transactions.forEach(item => {
    const grantAddress = ethers.utils.getAddress(item['To']);
    const donorAddress = ethers.utils.getAddress(item['From']);
    if (IGNORED_ADDRESSES.has(grantAddress) || IGNORED_ADDRESSES.has(donorAddress)) {
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
    donor.projects = donor.projects || [];
    donor.projects.push([grant.name || grantAddress, item['Quantity'], item['DateTime']]);
    donors[donorAddress] = donor;
  });
  
  calculateMatching(grants);
  
  const grantsCsv = grantsToCSV(grants);
  fs.writeFileSync('gitcoin-grants.csv', grantsCsv);
  
  const donorsCsv = donorsToCSV(donors);
  fs.writeFileSync('gitcoin-donors.csv', donorsCsv);
}
