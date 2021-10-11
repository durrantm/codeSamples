import toggleUImode from "./toggleUImode";

describe('Toggle UImode handles all values', () => {

  const fakeFn = () => {};

  it('toggles light-mode to dark-mode', () => {
    const result = toggleUImode('light-mode', fakeFn );
    expect(result).toEqual('dark-mode');
  });
  it('toggles dark-mode to light-mode', () => {
    const result = toggleUImode('dark-mode', fakeFn );
    expect(result).toEqual('light-mode');
  });
  it('toggles dark-mode to light-mode and then back to dark-mode', () => {
    const toggle = toggleUImode('light-mode', fakeFn );
    const toggleBack = toggleUImode(toggle, fakeFn );
    expect(toggleBack).toEqual('light-mode');
  });
  it('toggles Dark-Mode to light-mode (handles case difference)', () => {
    const result = toggleUImode('Dark-Mode', fakeFn );
    expect(result).toEqual('light-mode');
  });
  it('toggles unknown to dark-mode', () => {
    const result = toggleUImode('unknown', fakeFn );
    expect(result).toEqual('dark-mode');
  });
  it('toggles empty string to dark-mode', () => {
    const result = toggleUImode('', fakeFn );
    expect(result).toEqual('dark-mode');
  });
  it('toggles undefined value to dark-mode', () => {
    const result = toggleUImode(undefined, fakeFn );
    expect(result).toEqual('dark-mode');
  });
  it('toggles null to dark-mode', () => {
    const result = toggleUImode(null, fakeFn );
    expect(result).toEqual('dark-mode');
  });
});