import round from './round';

describe('Tests of rounding function', () => {
  describe('App rounding function', () => {
    it('rounds down to 2 decimal placed', () => {
      const result = round(100.004, 2);
      expect(result).toEqual("100.00");
    });
    it('rounds up with zero decimal places', () => {
      const result = round(100.51, 0);
      expect(result).toEqual("101");
    });
    it('rounds down with zero decimal places', () => {
      const result = round(100.49, 0);
      expect(result).toEqual("100");
    });
    it('rounds handles 0', () => {
      const result = round(0);
      expect(result).toEqual("0");
    });
    it('rounds handles blank', () => {
      const result = round();
      expect(result).toEqual("-");
    });
    it('rounds handles letters', () => {
      const result = round('a');
      expect(result).toEqual("-");
    });
    it('rounds handles undefined', () => {
      const result = round('a');
      expect(result).toEqual("-");
    });
  });
});
