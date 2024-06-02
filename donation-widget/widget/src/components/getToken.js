import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';

let tokenInfo = {
  ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
  PAN: '0xd56dac73a4d6766464b38ec6d91eb45ce7457c44',
};

function getTokenPrice(to, amount = 1, from = 'DAI') {
  const [info, setInfo] = useState();
  useEffect(() => {
    (async function () {
      let url = `https://api.1inch.exchange/v2.0/quote?fromTokenAddress=${
        tokenInfo[from]
      }&toTokenAddress=${
        tokenInfo[to]
      }&amount=${new BigNumber(amount)
        .shiftedBy(18)
        .toString()}`;
      let res = await fetch(url).then((res) => res.json());
      setInfo(res);
    })();
  }, []);
  return [info];
}

export default getTokenPrice;
