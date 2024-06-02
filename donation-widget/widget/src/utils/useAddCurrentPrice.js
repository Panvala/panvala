import { useEffect, useState } from 'react';

export default function useAddCurrentPrice(coins = []) {
  const [allCoins, setAllCoins] = useState(coins);
  useEffect(() => {
    (async function () {
      let coinsWithPrice = await Promise.all(
        coins.map((coin) =>
          fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coin.coingecko}&vs_currencies=usd`
          )
            .then((res) => res.json())
            .then((info) => ({
              ...coin,
              currentPrice: info[coin.coingecko].usd,
            }))
        )
      );
      setAllCoins(coinsWithPrice);
    })();
  }, []);
  return allCoins;
}
