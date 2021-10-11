import getCompassDirection from './getCompassDirection';

const compassTestPoints = new Map([
  [0, 'N'], [22, 'N'], [23, 'NE'], [67, 'NE'],
  [68, 'E'], [112, 'E'], [113, 'SE'], [157, 'SE'],
  [158, 'S'], [202, 'S'], [203, 'SW'], [247, 'SW'],
  [248, 'W'], [292, 'W'], [293, 'NW'], [337, 'NW'],
  [338, 'N']
]);

describe('Compass Direction', () => {
  it('tests them all', () => {
    let allPass = true;
    compassTestPoints.forEach((value, key) => {
      if (value !== getCompassDirection(key)) allPass = false;
    });
    expect(allPass).toEqual(true);
  });
});