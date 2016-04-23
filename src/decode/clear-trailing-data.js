export default function clearTrailingData(msgChunks) {
  const DELIMITER_LENGTH = 9
  let threshold = DELIMITER_LENGTH

  while(msgChunks.length && threshold) {
    const val = msgChunks.pop()

    if (val === 255) {
      threshold--
    }
  }

  return msgChunks
}
