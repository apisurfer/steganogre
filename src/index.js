import createShadowCanvas from './util/create-shadow-canvas'
import chunkMessage from './util/chunk-message'
import requiredPixels from './util/required-pixels'

window.ccc = createShadowCanvas(1, 1)
console.log(chunkMessage('a'))

window.steg = {
  createShadowCanvas,
  chunkMessage,
  requiredPixels,
}

export default {}
