import createCanvas from './util/create-canvas'
import chunkString from './util/chunk-string'

function verifyStrategy (strategy) {
  if (!strategy) throw Error('No strategy provided!')

  if (!strategy.encode || typeof strategy.encode !== 'function') throw Error('Strategy lacks encode method!')
  if (!strategy.decode || typeof strategy.decode !== 'function') throw Error('Strategy lacks decode method!')
  if (!strategy.canStoreMessage || typeof strategy.canStoreMessage !== 'function') throw Error('Strategy lacks canStoreMessage method!')
}

export default function steganogre (strategy, existingCanvas) {
  verifyStrategy(strategy)

  return {
    _strategy () {
      return strategy
    },
    _canvas () {
      return existingCanvas || createCanvas()
    },
    encode (messageString) {
      const msgChunks = chunkString(messageString)

      this._strategy().encode(msgChunks)
    }
  }
}
