import delimiter from './delimiter'

export default function clearTrailingData (imageDataArray) {
  let threshold = delimiter().length

  while (imageDataArray.length && threshold) {
    const val = imageDataArray.pop()

    if (val === 255) {
      threshold--
    }
  }

  return imageDataArray
}
