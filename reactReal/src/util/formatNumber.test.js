import formatNumber from './formatNumber';

describe('formatNumber', () => {
  it('returns the correct number formatted', () => {
    const number = '23';
    expect(number).toEqual('23');
  });
  it('handles null param being passed', () => {
    const result = formatNumber(null);
    expect(result).toEqual('0.0000');
  });
  it('handles undefined param being passed', () => {
    const result = formatNumber(undefined);
    expect(result).toEqual('');
  });
  it('handles no param being passed', () => {
    const result = formatNumber();
    expect(result).toEqual('');
  });
});