// import showTimeAMPM from './showTimeAMPM';
import showUnixTime from './showUnixTime';

describe('Tests of time format', () => {
  it('shows time', () => {
    const result = showUnixTime(160719258044, 'EST');
    expect(result).toEqual("09:20");
  });
  it('shows time II', () => {
    const result = showUnixTime(160739258044, 'EST');
    expect(result).toEqual("21:54");
  });
});
