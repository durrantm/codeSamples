import parseDate from './parseDate';

describe('parseDate util', () => {
  it('returns a known date for a known date', () => {
    const localeString = new Date('2021-03-02T09:44:52.747Z')
      .toLocaleString('en-US', { timeZone: 'America/Los_Angeles'});
    const mockedDate = new Date(localeString);
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate);
    const result = parseDate(new Date());
    expect(result).toEqual('03/02/21');
    spy.mockRestore();
  });

  it('handles no param being passed', () => {
    const today = new Date();
    const todayString = `${String(today).substring(8, 10)}/${String(today).substring(13, 15)}`;
    const result = parseDate().substring(3, 8);
    expect(result).toEqual(todayString);
  });
});