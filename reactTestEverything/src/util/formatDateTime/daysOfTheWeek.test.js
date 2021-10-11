import daysOfTheWeek from './daysOfTheWeek';

describe('Week has seven days', () => {
  it('test', () => {
    const daysInAWeekCount = Object.entries(daysOfTheWeek).length;
    expect(daysInAWeekCount).toEqual(7);
  });
});
