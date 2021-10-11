import imgIcon from './imgIcon';

describe('tests', () => {
  it('test', () => {
    const result = imgIcon(203);
    expect(result).toEqual('/weatherIcons/icons/203.png');
  });
});
