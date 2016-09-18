import s from '../src/index.js'

describe('steganogre module initialization', () => {
  it('should throw if not provided with strategy', () => {
    expect(s).toThrowError(/no strategy provided!/i)
  })

  it('should throw if bad strategy doesn\'t have a encode function', () => {
    const strategyMock = { decode () {}, calculateSize () {} }

    expect(() => s(strategyMock)).toThrowError(/Strategy lacks encode method!/i)
  })

  it('should throw if bad strategy doesn\'t have a decode function', () => {
    const strategyMock = { encode () {}, calculateSize () {} }

    expect(() => s(strategyMock)).toThrowError(/Strategy lacks decode method!/i)
  })

  it('should throw if bad strategy doesn\'t have a de function', () => {
    const strategyMock = { encode () {}, decode () {} }

    expect(() => s(strategyMock)).toThrowError(/Strategy lacks calculateSize method!/i)
  })
})
