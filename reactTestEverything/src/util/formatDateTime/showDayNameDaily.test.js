import showDayNameDaily from './showDayNameDaily';

describe('test day', () => {
  it('test day (UTC day of week)', () => {
    const result = showDayNameDaily("12-15-2020");
    expect(result).toEqual('Wednesday');
  });
});

