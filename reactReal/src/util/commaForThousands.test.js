import commaForThousands from './commaForThousands';

describe('comma for thousands format', () => {
  it('shows a comma for a value over 1,000 with no decimal', () => {
    const result = commaForThousands('2312');
    expect(result).toEqual('2,312');
  });
  it('shows a comma for a value over 10,000 with a decimal', () => {
    const result = commaForThousands('12312.45');
    expect(result).toEqual('12,312.45');
  });
  describe('shows no comma for values under 1000', () => {
    it('956', () => {
      expect(commaForThousands('956.99')).toEqual('956.99');
    });
    it('23.99', () => {
      expect(commaForThousands('23.99')).toEqual('23.99');
    });
    it('5', () => {
      expect(commaForThousands('5')).toEqual('5');
    });
  });
  it('shows blank space for blank parameter', () => {
    const result = commaForThousands(' ');
    expect(result).toEqual(' ');
  });
  it('shows nothing for empty parameter', () => {
    const result = commaForThousands('');
    expect(result).toEqual('');
  });
  it('shows nothing for missing parameter', () => {
    const result = commaForThousands();
    expect(result).toEqual('');
  });
});