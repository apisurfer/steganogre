const bytesPerPixel = 3 // using rgb pixel components

export default function requiredPixels(msg) {
  if (!msg || !msg.length) return 0;

  const msgByteSize = msg.length * 2 // utf-16 uses 2 bytes
  const pixelCount = msgByteSize / bytesPerPixel

  return Math.ceil(pixelCount)
}