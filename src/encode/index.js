import requiredPixels from '../util/required-pixels'
import createShadowCanvas from '../util/create-shadow-canvas'
import wrapCanvas from '../util/wrap-canvas'
import chunkMessage from './chunk-message'

export default function encode(msg) {
  const pixelNum = requiredPixels(msg)
  const canvas = createShadowCanvas(pixelNum, 1)
  const wrappedCanvas = wrapCanvas(canvas)
  const chunks = chunkMessage(msg)
  wrappedCanvas.putData(chunks)

  const dataURL = wrappedCanvas.el.toDataURL('image/png')
  wrappedCanvas.el.width = 0
  wrappedCanvas.el.heigh = 0

  return {
    dataURL,
    downloadHref() {
      return this.dataURL.replace('image/png', 'image/octet-stream')
    },
  }
}
