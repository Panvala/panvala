import BigNumber from 'bignumber.js';

export function getBigNumber(value) {
  return new BigNumber(value).shiftedBy(18).toString();
}

export function getSmallNumber(value) {
  return new BigNumber(value).shiftedBy(-18).toString();
}
