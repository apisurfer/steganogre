export default function extractMessage(dataArray) {
  let msg = ''

  for (let i = 0; i < dataArray.length; i += 2) {
    msg += String.fromCharCode(
      (dataArray[i] << 8) + dataArray[i + 1]
    )
  }

  return msg
}
