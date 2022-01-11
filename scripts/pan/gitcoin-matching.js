const axios = require('axios');
const ethers = require('ethers');
const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse');
const stringify = require('csv-stringify/lib/sync');

const MATCHING_BUDGET = 1369935.62;
const ONE_DOLLAR_PAN = 11.31;
const DONATIONS_STARTED_AT = Date.parse('2021-10-01');
const DONATIONS_ENDED_AT = Date.parse('2021-12-31'); // Date.now() during the round
const DONATIONS_BATCH_NUMBER = 13;
const GITCOIN_ADDRESS = '0xde21F729137C5Af1b01d73aF1dC21eFfa2B8a0d6';
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
  'bc1qupk2u36zdm0fd8mmnu0ha33g0d2lgynwxw6j70': '0x0000000000000000000000000000000000000000',
};

const LEAGUE_MAINNET_ADDRESSES = [
  "0x84a57c709482d44cE49511adac7ED7F1Db299455",
  "0x00CF36853AA4024fb5BF5cc377dfd85844B411a0",
  "0x1251A94b6d800979d2d933b8Bd5914b892772Ac6",
  "0xD120a3cb934694037a12E2F603d45Aa3aE77ABC3",
  "0x90dfc35e747ffcf9631ce75348f99632528e1704",
  "0xde21F729137C5Af1b01d73aF1dC21eFfa2B8a0d6",
  "0x4B8810b079eb22ecF2D1f75E08E0AbbD6fD87dbF",
  "0x5A9CE898f0B03c5A3Cd2d0c727efdD0555C86f81",
  "0x7DAC9Fc15C1Db4379D75A6E3f330aE849dFfcE18",
  "0xba0FEE8490118FC4f46Bd0974D7BF93d0e2f1064",
  "0x7415EfD9D908281ea0279c49A6c23011D9d9A0a4",
  "0xF64bBc221f89cc882fBa507908bbE4Ae3Ad2F470",
  "0xddB1CB4EdBCD83066Abf26E7102dc0e88009DEAB",
  "0x9531C059098e3d194fF87FebB587aB07B30B1306",
  "0xCCa88b952976DA313Fb928111f2D5c390eE0D723",
  "0x6Aa875452a622C25AFd05064138faFc14E715BeF",
  "0xC34ad4A95adCD9021182fd5607ED822DB738E7c4",
  "0x66Aa8Bee5366b6b48811AE0Dac9Fe5e1EEfE1621",
  "0x5b6BCdbB5278616F818775B9A20F220262Fd6E9B",
  "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  "0xB53b0255895c4F9E3a185E484e5B674bCCfbc076",
  "0xe7E2E1de02CDc8dC307eA4CD237C0a24CF52f2AA",
  "0x466621C1771590c4ECc5314eB3055adAFd980d52",
  "0x5ab45FB874701d910140e58EA62518566709c408",
  "0x3792acDf2A8658FBaDe0ea70C47b89cB7777A5a5",
  "0xE98dc4fdCb03cC29C0f64A00AAAd7F56d359CBAD",
  "0x2C5FF0Be38115Fe6E37ACce8e94F86186c3D73dF",
  "0x58315fB2b6E94371679fFb4b3322ab32f3dc7311",
  "0xD91ec22114897E5E68997F77a6182dE3Cb09ba9B",
  "0x9ac9c636404C8d46D9eb966d7179983Ba5a3941A",
  "0xF09631d7BA044bfe44bBFec22c0A362c7e9DCDd8",
  "0x5FfF94e8585a12A13B46177110A8812B6dB92F87",
  "0xd25A803E24FFd3C0033547BE04D8C43FFBa7486b",
  "0x78F3c73F5500335aAC51E4c2A79555D176b279da",
  "0x31e7e4bB3Aa3A5Dd3AC5E240223eb4416CFFa5c3",
  "0xe64e9187d513b455732fd63FD1398ecd1925A03E",
  "0x24801de57F065d95D741DFf0f419dc5004777C87",
  "0x308Fd8FB79379dEAD5A360FFb6Dd2D1AFf9F5EE4",
  "0x04A8A22e5eF364c5237Df13317c4F083f32C2Cc4",
  "0x7030B43E821BA34124915bA65B90Dbda7a9E7d09",
  "0x05dF81Bf098Ae29AfAd54250Cd224379eDCae850",
  "0x0e3655263D2db2C7ece965557d3889be0716c48b",
  "0xd9D66f6eB790c82A1e98CDa99C153983461A3725",
  "0x3792acDf2A8658FBaDe0ea70C47b89cB7777A5a5",
  "0x37133cda1941449cde7128f0C964C228F94844a8",
  "0x6030dB952f1aEeFA27d84D40D2f64c6216f64b0e",
  "0x9fC13b4E1C4206970a1C4520d2f77336CD5D0e0a",
  "0x549Adf7B383A1645F26a2AcFE09c5304B679A532",
  "0x842b87e0f5dd45ab5ff972b4d71f238ffad8ad3d",
  "0x57EA12A3A8E441f5FE7B1F3Af1121097b7d3B6A8",
  "0x3C5c2F4bCeC51a36494682f91Dbc6cA7c63B514C",
  "0x97Fb4845bf7bD7156B30ef09AE94419956FE3A90",
  "0x0efE994201e2b0136DD40D5033b5F437e4c5F958",
  "0x07294360e0bb89eBbE3542c478A8d1F6840ee2eE",
  "0x97b8fdfACf37dd68376198b7FCFFeC3c0846f593",
  "0xD25185f8c3B9e38C3f014378CE58B362Db568352",
  "0x1253594843798Ff0fcd7Fa221B820C2d3cA58FD5",
  "0x83b08111c4b42cb7188118ebd6739749384077c4",
  "0xe555c65c7BDB142AEbB1842Fbaa6427626573C87",
  "0x5b0F8D8f47E3fDF7eE1c337AbCA19dBba98524e6",
  "0xb8A7493995411569E9147306bcfE61e4372882AE",
  "0xD547bd0C023c3aDb8E0F2CC47340f5A4657be910",
  "0x7b52bE43a8D47ecebd7EB4c492480500E21827ad",
  "0x9277b013EcDB1f308b41cD8bc1ADdc097deD37c3",
  "0xDE798cD9C53F4806B9Cc7dD27aDf7c641540167c",
  "0x485c055099EFc4A1B69D7F036e1b1d20F18eC78E",
  "0x5A6C1AFa7d14FD608af17d7e58e8DB52DF5d66Ea",
  "0x09203487A637b28D8D5CfDFE0BCE8F7A815a8c48",
];

LEAGUE_SIDECHAIN_ADDRESSES = [
  "0x07294360e0bb89eBbE3542c478A8d1F6840ee2eE",
  "0x66Aa8Bee5366b6b48811AE0Dac9Fe5e1EEfE1621",
  "0xf848a2741682e498a6a620e27d768c28c4216cd5",
  "0x1251A94b6d800979d2d933b8Bd5914b892772Ac6",
  "0x5ab45FB874701d910140e58EA62518566709c408",
  "0xe027688a57c4A6Fb2708343cF330aaeB8fe594bb",
  "0xd9D66f6eB790c82A1e98CDa99C153983461A3725",
  "0x308Fd8FB79379dEAD5A360FFb6Dd2D1AFf9F5EE4",
  "0x5A9CE898f0B03c5A3Cd2d0c727efdD0555C86f81",
  "0x2C5FF0Be38115Fe6E37ACce8e94F86186c3D73dF",
  "0xddB1CB4EdBCD83066Abf26E7102dc0e88009DEAB",
  "0xAb2456B5758C0d7f4272151eFb56cb7643CA7E30",
];

const OFF_GITCOIN_GRANTS = {
  '0x97Fb4845bf7bD7156B30ef09AE94419956FE3A90': 'Civichub',
}

const BLOCKSCOUT_XDAI = 'https://blockscout.com/xdai/mainnet/api';
const XDAI_ADDRESSES = {
  "Shenanigan": "0x5A9CE898f0B03c5A3Cd2d0c727efdD0555C86f81",
  "Austin Meetups Fund": "0x07294360e0bb89eBbE3542c478A8d1F6840ee2eE",
  "future modern": "0x5ab45FB874701d910140e58EA62518566709c408",
  "Hashing it Out": "0xe027688a57c4A6Fb2708343cF330aaeB8fe594bb",
  "Trips Community": "0x2C5FF0Be38115Fe6E37ACce8e94F86186c3D73dF",
};

//const BLOCKSCOUT_MATIC = 'https://api.polygonscan.com/api/';
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
  const initialGrantAddresses = {...OFF_GITCOIN_GRANTS};
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
        // TODO: Stop fetching more pages of transactions once we reach a date earlier than DONATIONS_STARTED_AT
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
  const currentTransactions = transactions.filter(x => {
    const createdAt = Date.parse(x.created_at);
    return createdAt > DONATIONS_STARTED_AT && createdAt <= DONATIONS_ENDED_AT;
  });
  console.log(`donation period: ${DONATIONS_STARTED_AT} - ${DONATIONS_ENDED_AT}`);
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
  console.log(`Retrieved ${Object.keys(grantNames).length} grants from the Gitcoin API.`);

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
  const zksyncTransactions = await getZksyncTransactions(LEAGUE_MAINNET_ADDRESSES);

  const xdaiTransactions = await getBlockscoutTransactions(BLOCKSCOUT_XDAI, LEAGUE_SIDECHAIN_ADDRESSES);
  // FIXME: The new Polygon API at api.polygonscan.com does not support the gettxinfo method.
  // const maticTransactions = await getBlockscoutTransactions(BLOCKSCOUT_MATIC, Object.values(MATIC_ADDRESSES));

  const transactions = mainnetTransactions.concat(zksyncTransactions, xdaiTransactions/*, maticTransactions*/);

  const donorNames = await getDonorNames();

  const donors = {};
  const grants = {};

  transactions.forEach(item => {
    const grantAddress = ethers.utils.getAddress(item['To']);
    const donorAddress = ethers.utils.getAddress(item['From']);
    if (
      grantAddress === donorAddress ||
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
  fs.writeFileSync(`gitcoin-grants-batch-${DONATIONS_BATCH_NUMBER}.csv`, grantsCsv);

  const donorsCsv = donorsToCSV(donors);
  fs.writeFileSync(`gitcoin-donors-batch-${DONATIONS_BATCH_NUMBER}.csv`, donorsCsv);

  const donationsCsv = donationsToCSV(grants, donors);
  fs.writeFileSync(`gitcoin-donations-batch-${DONATIONS_BATCH_NUMBER}.csv`, donationsCsv);

  console.log('zksync fetch errors:', zksyncErrors);
  console.log('CSV files written.')
}
