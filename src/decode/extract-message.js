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

  // if we have a hanging byte drop it
  if (msgChunks % 1 !== 0) {
    msgChunks.pop()
  }

  for (let i = 0; i < msgChunks.length; i += 2) {
    console.log(msgChunks[i])
    console.log(msgChunks[i + 1])
    msg += String.fromCharCode(
      (msgChunks[i] << 8) + msgChunks[i + 1]
    )
  }

  return msg
}
