const ethers = require('ethers');
const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse');
const stringify = require('csv-stringify/lib/sync');

const mnemonic = process.env.MNEMONIC;

const currentDir = path.resolve(__dirname);
//const readDir = `${currentDir}/../../packages/panvala-utils/abis`;
const readDir = currentDir;
const BasicToken = JSON.parse(fs.readFileSync(`${readDir}/BasicToken.json`));

// default to mainnet contracts
const tokenAddress =
  process.env.TOKEN_ADDRESS || '0xD56daC73A4d6766464b38ec6D91eB45Ce7457c44';
const rpcEndpoint = process.env.RPC_ENDPOINT;

async function prepareContracts() {
  const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
  const token = new ethers.Contract(tokenAddress, BasicToken.abi, provider);

  console.log('token:', token.address);

  return { token, provider };
}

function getGrants() {
  return new Promise((resolve, reject) => {
    const grants = [];
    const currentDir = path.resolve(__dirname);
    const readDir = `${currentDir}`;
    fs.createReadStream(`${readDir}/gitcoin-grants.csv`)
      .pipe(csvParse({columns: true}))
      .on('data', row => {
        grants.push(row);
      })
      .on('end', () => resolve(grants));
  });
}

function getPreMatchState() {
  return new Promise((resolve, reject) => {
    const grants = [];
    const currentDir = path.resolve(__dirname);
    const readDir = `${currentDir}`;
    fs.createReadStream(`${readDir}/gitcoin-pre-match-state.csv`)
      .pipe(csvParse({columns: true}))
      .on('data', row => {
        grants.push(row);
      })
      .on('end', () => resolve(grants));
  });
}

async function writePreMatchState(grants, token) {
  const state = [];
  for (let i = 0; i < grants.length; i++) {
    state.push([
      grants[i]['Grant'],
      grants[i]['Address'],
      ethers.utils.parseEther(grants[i]['Donated Tokens']).toString(),
      (await token.balanceOf(grants[i]['Address'])).toString(),
      ethers.utils.parseEther(grants[i]['1.5M PAN Allocated']).toString(),
    ]);
  }
  
  const data = stringify(state, { header: true, columns: [
    'Grant', 'Address', 'Donated', 'Balance', 'Match'] });
  fs.writeFileSync('gitcoin-pre-match-state.csv', data);
}

async function run() {
  const { provider, token } = await prepareContracts();
  
  // Before the first run of the script, get the balance from each account before any matching
  // and store it on disk.
  const grantsToMatch = await getGrants();
  await writePreMatchState(grantsToMatch, token);
  return;
  
  // After the first run of this script, pull the pre-match state from disk to avoid matching more
  // than intended.
  const grants = await getPreMatchState();
  const matchingTotal = grants.reduce((total, grant) => total.add(grant['Match']), ethers.utils.bigNumberify(0));
  console.log('matching total:', matchingTotal.toString());
  console.assert(matchingTotal.eq('1384244327800000227630000'), 'Unexpected matching total');
  
  const mnemonicWallet = ethers.Wallet.fromMnemonic(mnemonic);
  const wallet = new ethers.Wallet(mnemonicWallet.privateKey, provider);
  const tokenWithSigner = token.connect(wallet);
  console.log('wallet:', wallet.address);

  let walletBalance = await token.balanceOf(wallet.address);
  // If there's lots of PAN in the wallet (avoid this on the first run), set a lower limit for the PAN
  // to distribute in a single execution.
  const safetyLimit = ethers.utils.parseEther('300000');
  if (walletBalance.gt(safetyLimit)) {
    walletBalance = safetyLimit;
  }
  console.log('Wallet PAN balance:', walletBalance.toString());
  
  const matchedAccounts = new Set([
    // After each run of the script, add accounts that have received matching to this set
    // so we don't repeat any matches.
  ]);
  
  for (let i = 0; i < grants.length; i++) {
    const grant = grants[i];
    if (matchedAccounts.has(grant['Address'])) {
      console.log(`SKIP ${grant['Grant']}`);
      continue;
    } else if (walletBalance.lt(grant['Match'])) {
      console.error(`INSUFFICIENT FUNDS: ${ethers.utils.formatEther(walletBalance)} < ${ethers.utils.formatEther(grant['Match'])}`);
      break;
    } else {
      // The primary safety check is updating the matchedAccounts set. As a backup check, abort if the account
      // doesn't have the expected balance.
      const granteeBalance = await token.balanceOf(grant['Address']);
      if (!granteeBalance.eq(grant['Balance'])) {
        console.log(`UNEXPECTED BALANCE for ${grant['Grant']}: expected ${ethers.utils.formatEther(grant['Balance'])} PAN, actual ${ethers.utils.formatEther(granteeBalance)}`);
        break;
      }
    }
    
    console.log(`TRANSFER ${ethers.utils.formatEther(grant['Match'])} PAN to ${grant['Grant']} (${grant['Address']})`);
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 10000);
    });
    console.log('Sending transaction...');
    // The gasPrice ethers uses by default doesn't always yield quick transactions, so consider hardcoding a gasPrice.
    const tx = await tokenWithSigner.transfer(grant['Address'], grant['Match'], { gasPrice: ethers.utils.parseUnits('15.2', 'gwei') });
    console.log(tx.hash);
    await tx.wait();
    
    walletBalance = walletBalance.sub(grant['Match']);
    matchedAccounts.add(grant['Address']);
  }
  
  console.log('CRITICAL: Update the matchedAccounts set:');
  console.log(JSON.stringify(Array.from(matchedAccounts), null, 2));
}

run();
