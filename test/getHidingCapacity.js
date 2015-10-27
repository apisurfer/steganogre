var getHidingCapacity = require('../src/getHidingCapacity');

describe('getHidingCapacity', function() {
  it('should return 0 if width or height is not specified', function() {
    expect(getHidingCapacity({width: 0, height: 100})).toBe(0);
    expect(getHidingCapacity({width: 100, height: 0})).toBe(0);
  });

  it('should return 0 if width or height is not specified', function() {
    expect(getHidingCapacity({width: 480, height: 360})).toBe(32400);
    expect(getHidingCapacity({width: 800, height: 600})).toBe(90000);
    expect(getHidingCapacity({width: 1600, height: 900})).toBe(270000);
    expect(getHidingCapacity({width: 1920, height: 1080})).toBe(388800);
  });
});

