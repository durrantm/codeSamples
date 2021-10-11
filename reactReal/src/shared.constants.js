export const marketsTrading = ['BTCUSD', 'ETHUSD', 'LTCUSD'];
export const markets = [...marketsTrading, 'BCHUSD'];
export const currencyNames = {
  BTCUSD: 'Bitcoin',
  ETHUSD: 'Ethereum',
  LTCUSD: 'Litecoin',
  USDUSD: 'US Dollars'
};
export const numRowsLimits = [25, 100, 1000];
export const buySellTypeFilter = ['BUY', 'SELL'];
export const priceLimits = {
  BTC: {
    priceMin: 1000,
    priceMax: 1000000,
    qtyMin: 0.000001,
    qtyMax: 10
  },
  LTC: {
    priceMin: 10,
    priceMax: 8000,
    qtyMin: 0.000001,
    qtyMax: 1000
  },
  ETH: {
    priceMin: 100,
    priceMax: 50000,
    qtyMin: 0.000001,
    qtyMax: 100
  }
};
