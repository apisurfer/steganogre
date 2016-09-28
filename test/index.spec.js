import s from '../src/index.js'
import chunkString from '../src/util/chunk-string'
import getCanvasImageData from '../src/util/get-canvas-image-data'

describe('steganogre module initialization', () => {
  it('should throw if not provided with strategy', () => {
    expect(s).toThrowError(/no strategy provided!/i)
  })

  it('should throw if bad strategy doesn\'t have a encode function', () => {
    const strategyMock = { decode () {}, canStoreMessage () {} }

    expect(() => s(strategyMock)).toThrowError(/Strategy lacks encode method!/i)
  })

  it('should throw if bad strategy doesn\'t have a decode function', () => {
    const strategyMock = { encode () {}, canStoreMessage () {} }

    expect(() => s(strategyMock)).toThrowError(/Strategy lacks decode method!/i)
  })

  it('should throw if bad strategy doesn\'t have a canStoreMessage function', () => {
    const strategyMock = { encode () {}, decode () {} }

    expect(() => s(strategyMock)).toThrowError(/Strategy lacks canStoreMessage method!/i)
  })

  it('should return object with method to access defined strategy', () => {
    const strategyMock = { encode () {}, decode () {}, canStoreMessage () {} }
    expect(s(strategyMock)._strategy()).toBe(strategyMock)
  })

  it('should return object with method to access canvas if provided', () => {
    const strategyMock = { encode () {}, decode () {}, canStoreMessage () {} }
    const canvas = document.createElement('canvas')

    expect(s(strategyMock, canvas)._canvas()).toBe(canvas)
  })

  it('should return object with method to access created canvas if none is provided', () => {
    const strategyMock = { encode () {}, decode () {}, canStoreMessage () {} }

    expect(s(strategyMock)._canvas().nodeName).toBe('CANVAS')
  })
})

describe('steganogre.canStoreMessage', () => {
  let strategyMock
  beforeEach(() => {
    strategyMock = { encode () {}, decode () {}, canStoreMessage () {} }

    spyOn(strategyMock, 'canStoreMessage').and.returnValues(
      true,
      false
    )
  })

  it('should call strategy.canStoreMessage with imageData array and message string', () => {
    const instance = s(strategyMock)
    const canvas = instance._canvas()
    const message = 'foobar'

    instance.canStoreMessage(message)

    expect(strategyMock.canStoreMessage).toHaveBeenCalledWith(
      getCanvasImageData(canvas),
      message
    )
  })

  it('should return result from strategy.canStoreMessage', () => {
    expect(s(strategyMock).canStoreMessage()).toBe(true)
    expect(s(strategyMock).canStoreMessage()).toBe(false)
  })
})

describe('steganogre.encode', () => {
  let strategyMock

  beforeEach(() => {
    strategyMock = { encode () {}, decode () {}, canStoreMessage () {} }

    spyOn(strategyMock, 'encode').and.returnValue(Promise.resolve('encoded value'))
    spyOn(strategyMock, 'canStoreMessage').and.returnValues(true, false)
  })

  it('should encode if strategy returns true from its canStoreMessage', () => {
    const instance = s(strategyMock)
    spyOn(instance, 'canStoreMessage').and.callThrough()
    instance.encode('foobar')

    expect(strategyMock.canStoreMessage).toHaveBeenCalledTimes(1)
    expect(strategyMock.encode).toHaveBeenCalledWith(chunkString('foobar'))

    // another try, will get false from strategyMock.canStoreMessage
    instance.encode('foobar2')
    expect(strategyMock.canStoreMessage).toHaveBeenCalledTimes(2)
    expect(strategyMock.encode).toHaveBeenCalledTimes(1)
    expect(strategyMock.encode).not.toHaveBeenCalledWith(chunkString('foobar2'))
  })

  it('should call the strategie\'s encode method and return the value', done => {
    const instance = s(strategyMock)
    const encodedMessage = instance.encode('foobar')

    expect(strategyMock.encode).toHaveBeenCalledWith(chunkString('foobar'))
    encodedMessage.then(response => {
      expect(response).toBe('encoded value')
      done()
    })
  })
})
