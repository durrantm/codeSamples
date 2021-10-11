import shortOrderID from './shortOrderID';

describe('shortOrderID()', () => {
  it('does nothing if the string is sufficiently short', () => {
    expect(shortOrderID('10.1234567', 10)).toBe('10.1234567');
    expect(shortOrderID('10.12378', 5)).toBe('12378');
  });

  it('truncates if the string is sufficiently long', () => {
    expect(shortOrderID('10.1234567', 4)).toBe('4567');
    expect(shortOrderID('10.124', 3)).toBe('124');
  });

  it('defaults to six characters', () => {
    expect(shortOrderID('103.345678')).toBe('345678');
    expect(shortOrderID('103.3456789')).toBe('456789');
    expect(shortOrderID('103.2')).toBe('103.2');
  });
});
