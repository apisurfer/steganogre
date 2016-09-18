import delimiter from '../util/delimiter'

export default function clearTrailingData(msgChunks) {
  let threshold = delimiter().length

  while(msgChunks.length && threshold) {
    const val = msgChunks.pop()

    if (val === 255) {
      threshold--
    }
  }

  return msgChunks
}
