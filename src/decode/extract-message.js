import clearTrailingData from './clear-trailing-data'

export default function extractMessage(imageData) {
  let msgChunks = []
  let msg = ''

  for (let i = 0; i < imageData.length; i += 4) {
    msgChunks.push(
      imageData[i],
      imageData[i + 1],
      imageData[i + 2]
    )
  }

  msgChunks = clearTrailingData(msgChunks)

  for (let i = 0; i < msgChunks.length; i += 2) {
    msg += String.fromCharCode(
      (msgChunks[i] << 8) + msgChunks[i + 1]
    )
  }

  return msg
}
