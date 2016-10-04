import createCanvas from './util/create-canvas'
import chunkString from './util/chunk-string'
import getCanvasImageData from './util/get-canvas-image-data'
import delimitChunks from './util/delimit-chunks'
import calculateRequiredPixels from './util/calculate-required-pixels'
import calculateImageDimensions from './util/calculate-image-dimensions'
import setCanvasImageData from './util/set-canvas-image-data'
import stripAlphaChannel from './util/strip-alpha-channel'
import clearTrailingData from './util/clear-trailing-data'

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

    getByteSize (message) {
      if (!(message instanceof Uint8ClampedArray)) {
        message = chunkString(message)
      }

      return message.length
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
      if (!(message instanceof Uint8ClampedArray)) {
        message = chunkString(message)
      }

      if (this.canStoreMessage(message)) {
        return this
          ._strategy()
          .encode(message)
          .then(imageArrayData => {
            const delimitedData = delimitChunks(imageArrayData)
            const requiredPixels = calculateRequiredPixels(delimitedData.length)
            const {width, height} = calculateImageDimensions(requiredPixels)

            this._canvas().width = width
            this._canvas().height = height
            setCanvasImageData(this._canvas(), delimitedData)

            return imageArrayData
          })
      }
    },

    decode (imageSrc) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous' // enable cross origin content

        img.onload = () => {
          const { width, height } = img

          this._canvas().width = width
          this._canvas().height = height
          this._canvas().getContext('2d').drawImage(img, 0, 0)

          const imageArrayData = getCanvasImageData(this._canvas())
          const decoded = this._strategy().decode(imageArrayData)

          decoded.then(imageData => {
            resolve(clearTrailingData(stripAlphaChannel(imageData)))
          })

        }

        img.onerror = (...args) => reject(...args)

        img.src = imageSrc
      })
    }
  }
}
