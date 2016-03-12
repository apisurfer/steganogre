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

  for (let i = 0; i < msgChunks.length; i += 2) {
    msg += String.fromCharCode(
      (msgChunks[i] << 8) + msgChunks[i + 1]
    )
  }

  return msg
}
