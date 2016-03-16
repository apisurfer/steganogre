export default function clearTrailingData(msgChunks) {
  // no need for "leftover" byte; utf-16 uses 2 bytes so
  // when we have a hanging byte it's for sure not being used; discard it
  if (msgChunks.length % 2 !== 0) {
    msgChunks.pop()
  }

  // Go from end and clear all 2byte pairs that are empty
  let partsToTrim = 0

  for (let i = msgChunks.length - 1; i >= 0; i -= 2) {
    if (msgChunks[i] === 0 && msgChunks[i - 1] === 0) {
      partsToTrim += 2
    } else {
      break
    }
  }

  msgChunks.splice(-partsToTrim)

  return msgChunks
}
