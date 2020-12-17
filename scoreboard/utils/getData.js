import records from '../data/record-slugify.json';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function slugifyKeysOfArray(array = []) {
  return array.map((info) => {
    let obj = {};

    let keys = Object.keys(info);

    keys.forEach((key) => {
      obj[slugify(key)] = info[key];
    });
    return obj;
  });
}

export function getQuarterData(data = records) {
  return data.reduce((acc, cv, index) => {
    acc.stakedTokens =
      (acc.stakedTokens || 0) + Number(cv.stakedTokens);
    acc.panDonated =
      (acc.panDonated || 0) + Number(cv.panDonated);
    acc.donationCount =
      (acc.donationCount || 0) + Number(cv.donationCount);
    acc.estimatedFundingUSD =
      (acc.estimatedFundingUSD || 0) +
      Number(cv.estimatedFundingUSD);
    acc.estimatedFundingPAN =
      (acc.estimatedFundingPAN || 0) +
      Number(cv.estimatedFundingPAN);

    return acc;
  }, {});
}
