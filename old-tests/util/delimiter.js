import delimiter from '../../src/util/delimiter'

describe('delimiter', () => {
  it('should return correct delimiter data', () => {
    expect(delimiter()).toEqual([255, 255, 255, 255, 255, 255, 255, 255, 255])
  })
})
