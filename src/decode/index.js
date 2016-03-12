import createShadowCanvas from '../util/create-shadow-canvas'
import extractMessage from './extract-message'

export default function decode(imageData) {
  return extractMessage(imageData)
}
