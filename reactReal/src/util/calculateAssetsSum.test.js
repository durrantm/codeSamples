import calculateAssetsSum from './calculateAssetsSum';

describe('calculateSum', () => {
  it('returns 0 for no wallet or prices', () => {
    const result = calculateAssetsSum();
    expect(result).toEqual(0);
  });
  it('returns 0 for no prices', () => {
    const wallet = {
      items: [
        { asset: 'BTC', available: 1, trading: 1 },
        { asset: 'ETH', available: 10, trading: 5 },
        { asset: 'LTC', available: 100, trading: 10 }
      ]
    };
    const result = calculateAssetsSum(wallet);
    expect(result).toEqual(0);
  });
  it('ignore unpriced currencies in wallet', () => {
    const prices = { 'BTC': 300, 'ETH': 30, 'LTC': 1 };
    const wallet = {
      items: [
        { asset: 'BTC', available: 7, trading: 6 },
        { asset: 'ZZZ', available: 500, trading: 4 }
      ]
    };
    const result = calculateAssetsSum(wallet.items, prices);
    expect(result).toEqual(3900);
  });
  it('returns (300 * 13) + (30 * 504) + 5.58 = 19025.58 for given wallet and prices', () => {
    const wallet = {
      items: [
        { asset: 'BTC', available: 7, trading: 6 },
        { asset: 'ETH', available: 500, trading: 4 },
        { asset: 'LTC', available: 3.3, trading: 2.28 }
      ]
    };
    const prices = { 'BTC': 300, 'ETH': 30, 'LTC': 1 };
    const result = calculateAssetsSum(wallet.items, prices);
    expect(result).toEqual(19025.58);
  });
});