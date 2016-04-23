import requiredPixels from '../../src/encode/required-pixels'

describe('requiredPixels', () => {
  it('should return 0 if no message is passed as arg', () => {
    expect(requiredPixels()).toBe(0);
  })

  it('should return corect pixel number for given message', () => {
    const msg = 'test message %!^@&*#()OP{L":LS:LMD'

    expect(requiredPixels(msg))
      .toBe(
        Math.ceil(
          (msg.length * 2 + 9) / 3
        )
      )
  })
})