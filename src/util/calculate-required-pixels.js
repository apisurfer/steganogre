import delimiter from './delimiter'

export default function requiredPixels (msgByteSize) {
  if (!msgByteSize) return 0

  const pixelCount = (msgByteSize + delimiter().length) / 3  // 3 - bytes per pixel

  return Math.ceil(pixelCount)
}
