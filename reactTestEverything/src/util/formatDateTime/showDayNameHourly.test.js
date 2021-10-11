import showDayNameHourly from './showDayNameHourly';

describe('tests', () => {
  it('test', () => {
    const date_to_test = "2020-12-15:9";
    const result = showDayNameHourly(date_to_test);
    expect(result).toEqual("Tue 4AM");
  });
});
