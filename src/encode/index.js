import requiredPixels from './required-pixels'
import calculateDimension from './calculate-dimension'
import chunkMessage from './chunk-message'
import createShadowCanvas from '../util/create-shadow-canvas'
import wrapCanvas from '../util/wrap-canvas'
import delimitChunks from './delimit-chunks'

export default function encode(msg, existingCanvas) {
  const pixelNum = requiredPixels(msg)
  const dimension = calculateDimension(pixelNum)
  const canvas = createShadowCanvas(dimension.width, dimension.height, existingCanvas)
  const wrappedCanvas = wrapCanvas(canvas)
  const chunks = delimitChunks(chunkMessage(msg))
  wrappedCanvas.putData(chunks)

  const dataURL = wrappedCanvas.el.toDataURL('image/png')

  return {
    dataURL,
    downloadHref() {
      return this.dataURL.replace('image/png', 'image/octet-stream')
    },
  }
}
