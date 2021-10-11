import { exact, string, arrayOf } from 'prop-types';

const pricesType = exact({
  BTC: string,
  ETH: string,
  LTC: string
});

const walletType = exact({
  items: arrayOf(
    exact({
      asset: string,
      available: string,
      trading: string
    })
  )
});

const itemType = exact({
  asset: string,
  available: string,
  trading: string,
  bidPrice: string
});

export { pricesType, walletType, itemType };
