// TOOD: rethink; there's a faster approach
export default function extractMessage(imageData) {
  const msgChunks = []
  let msg = ''

  console.clear()

  for (let i = 0; i < imageData.length; i += 4) {
    console.log(imageData[i])
    console.log(imageData[i + 1])
    console.log(imageData[i + 2])
    msgChunks.push(
      imageData[i],
      imageData[i + 1],
      imageData[i + 2]
    )
  }
  console.log(msgChunks)

  // no need for "leftover" byte; utf-16 uses 2 bytes so
  // when we have a hanging one from RGB components we discard it
  if (msgChunks.length % 2 !== 0) {
    msgChunks.pop()
  }

  for (let i = 0; i < msgChunks.length; i += 2) {
    msg += String.fromCharCode(
      (msgChunks[i] << 8) + msgChunks[i + 1]
    )
  }

  return msg
}
