const DELIMITER_LENGTH = 9

export default function requiredPixels(msg) {
  if (!msg || !msg.length) return 0

  const msgByteSize = msg.length * 2 // utf-16 uses 2 bytes
  const pixelCount = (msgByteSize + DELIMITER_LENGTH) / 3  // 3 - bytes per pixel

  return Math.ceil(pixelCount)
}