import requiredPixels from '../util/required-pixels'
import createShadowCanvas from '../util/create-shadow-canvas'
import chunkMessage from './chunk-message'

export default function encode(msg) {
  const pixelNum = requiredPixels(msg)
  const canvas = createShadowCanvas(pixelNum, 1) // TODO: options for this?
  const chunks = chunkMessage(msg)
  canvas.putData(chunks)

  return canvas
}
