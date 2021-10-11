import currency from './currency';

describe('Currency', () => {
  it('works for BTCUSD', () => {
    const result = currency('BTCUSD');
    expect(result).toEqual('BTC');
  });
  it('works for BTCEUR', () => {
    const result = currency('BTCEUR');
    expect(result).toEqual('BTC');
  });
  it('works for blank', () => {
    const result = currency('');
    expect(result).toEqual('');
  });
  it('works for null', () => {
    const result = currency();
    expect(result).toEqual('');
  });
});