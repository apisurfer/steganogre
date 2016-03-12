import createShadowCanvas from './util/create-shadow-canvas'
import encode from './encode/'
import requiredPixels from './util/required-pixels'

const msg = 'abcdefg'
const pixelNum = requiredPixels(msg)

const canvas = createShadowCanvas(pixelNum, 1)

export default {
  createShadowCanvas,
  encode,
  requiredPixels,
}
