import showMonthName from './showMonthName';

describe('Month Name', () => {
  it('Jan', () => {
    const result = showMonthName(0);
    expect(result).toEqual('Jan');
  });
  it('Dec', () => {
    const result = showMonthName(11);
    expect(result).toEqual('Dec');
  });
  it('blank', () => {
    const result = showMonthName();
    expect(result).toBeUndefined();
  });
});
