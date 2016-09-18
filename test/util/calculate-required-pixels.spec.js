import calculateRequiredPixels from '../../src/util/calculate-required-pixels'
import delimiter from '../../src/util/delimiter'

describe('calculateRequiredPixels', () => {
  it('should return 0 if no message is passed as arg', () => {
    expect(calculateRequiredPixels()).toBe(0)
  })

  it('should return corect pixel number for given byte length', () => {
    const length = 4
    expect(calculateRequiredPixels(length))
      .toBe(Math.ceil((length + delimiter().length) / 3))
  })
})
