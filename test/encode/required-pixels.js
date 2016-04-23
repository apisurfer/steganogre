import requiredPixels from '../../src/encode/required-pixels'
import delimiter from '../../src/util/delimiter'

describe('requiredPixels', () => {
  it('should return 0 if no message is passed as arg', () => {
    expect(requiredPixels()).toBe(0);
  })

  it('should return corect pixel number for given byte length', () => {
    const length = 4
    expect(requiredPixels(length))
      .toBe(Math.ceil((length + delimiter().length) / 3))
  })
})