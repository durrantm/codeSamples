import formatTimeStamp from './formatTimeStamp';

describe('formatTimeStamp util', () => {
  const date = new Date('2021-03-02T04:44:52.747Z');

  it('returns the correct timestamp for the west coast', () => {
    const dateInCA = new Date(date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles'}));
    const resultInCA = formatTimeStamp(dateInCA);
    expect(resultInCA).toEqual('03-01 20:44');
  });

  it('returns the correct timestamp for the east coast', () => {
    const dateInNY = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York'}));
    const resultInNY = formatTimeStamp(dateInNY);
    expect(resultInNY).toEqual('03-01 23:44');
  });

  it('handles no param being passed', () => {
    const result = formatTimeStamp();
    expect(result).toEqual('');
  });
});