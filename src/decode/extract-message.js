import clearTrailingData from './clear-trailing-data'

export default function extractMessage(dataArray) {
  let msgChunks = clearTrailingData(dataArray)
  let msg = ''

  for (let i = 0; i < msgChunks.length; i += 2) {
    msg += String.fromCharCode(
      (msgChunks[i] << 8) + msgChunks[i + 1]
    )
  }

  return msg
}
