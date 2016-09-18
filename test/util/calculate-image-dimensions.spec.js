import calculateImageDimensions from '../../src/util/calculate-image-dimensions'

describe('calculateImageDimensions', () => {
  // best scenario. number that can represented as one value squared. same width and height
  it('should return identical width and height values if provided number can be squared without remainder', () => {
    expect(calculateImageDimensions(25).width).toBe(5)
    expect(calculateImageDimensions(25).height).toBe(5)

    expect(calculateImageDimensions(16).width).toBe(4)
    expect(calculateImageDimensions(16).height).toBe(4)

    expect(calculateImageDimensions(64).width).toBe(8)
    expect(calculateImageDimensions(64).height).toBe(8)
  })

  // if it can fit the remainder of the data it just adds one more row
  it('should return height thats 1px bigger than width if remainder is smaller than width', () => {
    expect(calculateImageDimensions(27).width).toBe(5)
    expect(calculateImageDimensions(27).height).toBe(6)

    expect(calculateImageDimensions(17).width).toBe(4)
    expect(calculateImageDimensions(17).height).toBe(5)

    expect(calculateImageDimensions(71).width).toBe(8)
    expect(calculateImageDimensions(71).height).toBe(9)
  })

  // for bigger remainders we append more rows add pixels to height until we accomodate all the data
  it('should return height thats 1px bigger than width if remainder is smaller than width', () => {
    expect(calculateImageDimensions(33).width).toBe(5)
    expect(calculateImageDimensions(33).height).toBe(7)

    expect(calculateImageDimensions(21).width).toBe(4)
    expect(calculateImageDimensions(21).height).toBe(6)

    expect(calculateImageDimensions(76).width).toBe(8)
    expect(calculateImageDimensions(76).height).toBe(10)
  })
})
