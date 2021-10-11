import total from './total';

describe('total()', () => {
  it('returns a total by default', () => {
    expect(total([1, 2, 3, 4])).toBe(10);
  });

  it('allows us to provide an accessor function', () => {
    expect(total(['hi', 'hello', 'goodbye'], str => str.length)).toBe(2 + 5 + 7);
  });

  it('can provide different values for different accessors', () => {
    const objects = [{ duration: 90, rating: 10 }, { duration: 115, rating: 6 }];
    expect(total(objects, obj => obj.duration)).toBe(205);
    expect(total(objects, obj => obj.rating)).toBe(16);
  });
});