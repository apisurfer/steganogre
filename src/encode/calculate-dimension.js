export default function calculateDimension(num) {
  const width = Math.floor(Math.sqrt(num))
  const remainder = num - (width * width)
  let height

  if (remainder) {
    height = remainder >= width ? width + Math.ceil(remainder / width) : width + 1
  }

  return {
    width,
    height,
  }
}
