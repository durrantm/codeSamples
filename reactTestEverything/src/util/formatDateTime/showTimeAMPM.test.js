import showTimeAMPM from './showTimeAMPM';

describe('time-test', () => {
  it('Tests the time format', () => {
    const time = showTimeAMPM(Date(1607490060), 'EST');
    expect(time).toEqual('12AM');
  });
});