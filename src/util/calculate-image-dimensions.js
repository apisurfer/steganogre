/**
 * Function that tries to "suqarify" image dimensions
 */
export default function calculateImageDimensions (pixelNumber) {
  const width = Math.floor(Math.sqrt(pixelNumber))
  const remainder = pixelNumber - (width * width)
  let height = width

  if (remainder) {
    height = remainder >= width ? width + Math.ceil(remainder / width) : width + 1
  }

  return {
    width,
    height
  }
}
