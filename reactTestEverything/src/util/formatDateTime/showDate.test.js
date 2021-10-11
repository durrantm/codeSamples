import showDate from './showDate';

describe('tests', () => {
  it('test', () => {
    const result = showDate('Tue 02 dec 2020 EST GMT-0500');
    expect(result).toEqual('2 dec');
  });
});
