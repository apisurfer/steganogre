import requiredPixels from './required-pixels'
import calculateDimension from './calculate-dimension'
import chunkMessage from './chunk-message'
import createShadowCanvas from '../util/create-shadow-canvas'
import wrapCanvas from '../util/wrap-canvas'
import delimitChunks from './delimit-chunks'

function encodeUint8Array(chunks, existingCanvas) {
  const imgDimension = calculateDimension(requiredPixels(chunks.length))
  const $canvas = wrapCanvas(createShadowCanvas(imgDimension.width, imgDimension.height, existingCanvas))
  const delimitedChunks = delimitChunks(chunks)

  $canvas.putData(delimitedChunks)

  const dataURL = $canvas.el.toDataURL('image/png')

  return {
    dataURL,
    downloadHref() {
      return this.dataURL.replace('image/png', 'image/octet-stream')
    },
  }
}

export default {
  encodeString(msg, existingCanvas) {
    const chunks = chunkMessage(msg)

    return encodeUint8Array(chunks, existingCanvas)
  },

  encodeUint8Array,
}
