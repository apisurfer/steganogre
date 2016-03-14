// TOOD: rethink; there's a faster approach
export default function extractMessage(imageData) {
  const msgChunks = []
  let msg = ''

  for (let i = 0; i < imageData.length; i += 4) {
    msgChunks.push(
      imageData[i],
      imageData[i + 1],
      imageData[i + 2]
    )
  }

  // no need for "leftover" byte; utf-16 uses 2 bytes so
  // when we have a hanging one from RGB components we discard it
  if (msgChunks.length % 2 !== 0) {
    msgChunks.pop()
  }

  // if last two bytes are empty just drop them; remaining because 2byte chars are stored using
  // rgb(3 bytes) channels per pixel;
  if (msgChunks[msgChunks.length -1] === 0 && msgChunks[msgChunks.length -2] === 0) {
    msgChunks.pop()
    msgChunks.pop()
  }

  for (let i = 0; i < msgChunks.length; i += 2) {
    msg += String.fromCharCode(
      (msgChunks[i] << 8) + msgChunks[i + 1]
    )
  }

  return msg
}
