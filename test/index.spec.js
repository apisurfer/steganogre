import s from '../src/index.js'
import chunkString from '../src/util/chunk-string'
import getCanvasImageData from '../src/util/get-canvas-image-data'
import delimitChunks from '../src/util/delimit-chunks'
import calculateRequiredPixels from '../src/util/calculate-required-pixels'
import calculateImageDimensions from '../src/util/calculate-image-dimensions'
import stripAlphaChannel from '../src/util/strip-alpha-channel'
import clearTrailingData from '../src/util/clear-trailing-data'

const strategyEmptyMock = () => ({
  encode () {},
  decode () {},
  canStoreMessage () {},
  capacity () {}
})

describe('steganogre module initialization', () => {
  it('should throw if not provided with strategy', () => {
    expect(s).toThrowError(/no strategy provided!/i)
  })

  it('should throw if strategy doesn\' meet the required signature', () => {
    const strategyMock = {}

    const errMsg = 'Your strategy is missing some of the required methods. ' +
      '[encode, decode, canStoreMessage, capacity]'

    expect(() => s(strategyMock)).toThrowError(errMsg)
    strategyMock.encode = () => {}
    expect(() => s(strategyMock)).toThrowError(errMsg)
    strategyMock.decode = () => {}
    expect(() => s(strategyMock)).toThrowError(errMsg)
    strategyMock.canStoreMessage = () => {}
    expect(() => s(strategyMock)).toThrowError(errMsg)
    strategyMock.capacity = () => {}
    // don't throw, meets the requirements
    expect(() => s(strategyMock)).not.toThrow()
  })

  it('should return object with method to access defined strategy', () => {
    const strategyMock = strategyEmptyMock()
    expect(s(strategyMock)._strategy()).toBe(strategyMock)
  })

  it('should return object with method to access canvas if provided', () => {
    const strategyMock = strategyEmptyMock()
    const canvas = document.createElement('canvas')

    expect(s(strategyMock, canvas)._canvas()).toBe(canvas)
  })

  it('should return object with method to access created canvas if none is provided', () => {
    const strategyMock = strategyEmptyMock()

    expect(s(strategyMock)._canvas().nodeName).toBe('CANVAS')
  })
})

describe('steganogre.canStoreMessage', () => {
  let strategyMock
  beforeEach(() => {
    strategyMock = strategyEmptyMock()

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

describe('steganogre.capacity', () => {
  let strategyMock
  beforeEach(() => {
    strategyMock = strategyEmptyMock()

    spyOn(strategyMock, 'capacity').and.returnValues(
      100,
      300
    )
  })

  it('should call strategy.capacity with imageData array', () => {
    const instance = s(strategyMock)
    const canvas = instance._canvas()

    instance.capacity()
    expect(strategyMock.capacity).toHaveBeenCalledWith(
      getCanvasImageData(canvas)
    )

    instance.capacity()
    expect(strategyMock.capacity).toHaveBeenCalledWith(
      getCanvasImageData(canvas)
    )
    expect(strategyMock.capacity).toHaveBeenCalledTimes(2)
  })

  it('should return result from strategy.capacity', () => {
    expect(s(strategyMock).capacity()).toBe(100)
    expect(s(strategyMock).capacity()).toBe(300)
  })
})

describe('steganogre.encode', () => {
  let strategyMock

  beforeEach(() => {
    strategyMock = strategyEmptyMock()

    spyOn(strategyMock, 'encode').and.returnValue(Promise.resolve([1, 2, 3, 4, 5]))
    spyOn(strategyMock, 'canStoreMessage').and.returnValues(true, false)
  })

  it('should encode only if strategy returns true from its canStoreMessage', () => {
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

  it('should chunk if the message is not an Uint8ClampedArray', () => {
    const instance = s(strategyMock)
    spyOn(instance, 'canStoreMessage').and.returnValue(true)
    const msg = 'foobar'
    const chunked = chunkString(msg)
    instance.encode(msg)
    expect(instance.canStoreMessage).toHaveBeenCalledWith(chunked)
  })

  it('should call the strategie\'s encode method and return resolved value', done => {
    const instance = s(strategyMock)
    const encodedMessage = instance.encode('foobar')

    expect(strategyMock.encode).toHaveBeenCalledWith(chunkString('foobar'))
    encodedMessage.then(response => {
      expect(response).toEqual([1, 2, 3, 4, 5])
      done()
    })
  })

  it('should resize canvas to accomodate data', done => {
    const instance = s(strategyMock)
    const encoded = instance.encode('foobar')

    encoded.then(imageData => {
      const data = delimitChunks(imageData)
      const requiredPixels = calculateRequiredPixels(data.length)
      const { width, height } = calculateImageDimensions(requiredPixels)

      expect(instance._canvas().width).toBe(width)
      expect(instance._canvas().height).toBe(height)
      done()
    })
  })

  it('should place delimited data onto canvas', done => {
    const instance = s(strategyMock)
    const encoded = instance.encode('whatever')

    encoded.then(imageData => {
      const data = imageData

      expect(
        clearTrailingData(
          stripAlphaChannel(
            getCanvasImageData(instance._canvas())
          )
        )
      ).toEqual(data)
      done()
    })
  })
})
