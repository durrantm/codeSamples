import textToLED, { charToLED, numRows } from './textToLED';

describe('textToLED()', () => {
  it('uses a mapping with letters of the same size', () => {
    for (const char in charToLED) {
      expect(charToLED[char].every(column => column.length === numRows)).toBe(true);
    }
  });

  it('maps strings to arrays of lights correctly', () => {
    expect(textToLED('a bc')).toEqual([
      ...charToLED.A,
      ...charToLED[' '],
      ...charToLED[' '],
      ...charToLED[' '],
      ...charToLED.B,
      ...charToLED[' '],
      ...charToLED.C,
      ...charToLED[' ']
    ]);
  });

  it('handles an unrecognized character', () => {
    expect(textToLED(',@,').length).toEqual(6);
  });
});
