import stripAlphaChannel from '../../src/util/strip-alpha-channel'

describe('stripAlphaChannel', () => {
  it('should remove all the alpha data from image data array and return new array', () => {
    expect(stripAlphaChannel([1, 2, 3, 255])).toEqual([1, 2, 3])
    expect(stripAlphaChannel([1, 2, 3, 255, 4, 5, 6, 255])).toEqual([1, 2, 3, 4, 5, 6])
  })
})
