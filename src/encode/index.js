import requiredPixels from '../util/required-pixels'
import createShadowCanvas from '../util/create-shadow-canvas'
import wrapCanvas from '../util/wrap-canvas'
import chunkMessage from './chunk-message'

export default function encode(msg) {
  const pixelNum = requiredPixels(msg)
  const canvas = createShadowCanvas(pixelNum, 1) // TODO: options for sizing?
  const wrappedCanvas = wrapCanvas(canvas)
  const chunks = chunkMessage(msg)
  wrappedCanvas.putData(chunks)

  return wrappedCanvas
}
