import createCanvas from './util/create-canvas'
import chunkString from './util/chunk-string'
import getCanvasImageData from './util/get-canvas-image-data'

function verifyStrategy (strategy) {
  if (!strategy) throw Error('No strategy provided!')

  if (!strategy.encode || typeof strategy.encode !== 'function' ||
    !strategy.decode || typeof strategy.decode !== 'function' ||
    !strategy.canStoreMessage || typeof strategy.canStoreMessage !== 'function' ||
    !strategy.capacity || typeof strategy.capacity !== 'function') {
    throw new Error(
      'Your strategy is missing some of the required methods. ' +
      '[encode, decode, canStoreMessage, capacity]'
    )
  }
}

export default function steganogre (strategy, canvas = createCanvas()) {
  verifyStrategy(strategy)

  return {
    _strategy () {
      return strategy
    },
    _canvas () {
      return canvas
    },

    canStoreMessage (message) {
      return strategy.canStoreMessage(
        getCanvasImageData(canvas),
        message
      )
    },

    capacity () {
      return strategy.capacity(getCanvasImageData(canvas))
    },

    encode (message) {
      const msgChunks = chunkString(message)

      if (this.canStoreMessage(message)) {
        return this._strategy().encode(msgChunks)
      }
    }
  }
}
