import withDecimals from './withDecimals';

describe('withDecimals()', () => {
  it('returns the correctly formatted number for zero', () => {
    const result = withDecimals(0);
    expect(result).toEqual('0.0000');
  });
  it('returns the correctly formatted number for a zero', () => {
    const sign = withDecimals(0);
    expect(sign).toEqual('0.0000');
  });
  it('returns nothing for blank param', () => {
    const sign = withDecimals('');
    expect(sign).toEqual('0.0000');
  });
  it('returns nothing for null', () => {
    const sign = withDecimals(null);
    expect(sign).toEqual('0.0000');
  });
  it('returns nothing for undefined param', () => {
    const sign = withDecimals(undefined);
    expect(sign).toEqual('0.0000');
  });
  it('returns nothing for missing param', () => {
    const sign = withDecimals();
    expect(sign).toEqual('0.0000');
  });
});