import dollars from './dollars';

describe('formatNumber', () => {
  it('returns a whole dollars number formatted', () => {
    const number = '23';
    expect(dollars(number)).toEqual('$23');
  });
  it('returns a dollars and cents number correct number formatted', () => {
    const number = '23.99';
    expect(dollars(number)).toEqual('$23.99');
  });
  it('returns a large dollars and no cents number correct number formatted', () => {
    const number = '146323';
    expect(dollars(number)).toEqual('$146,323');
  });
  it('returns a large dollars and some cents number correct number formatted', () => {
    const number = '146323.01';
    expect(dollars(number)).toEqual('$146,323.01');
  });
});