export default function chunkMessage(msg) {
  const msgChunks = []

  console.clear()

  for (let i = 0; i < msg.length; i++) {
    const char = msg[i]
    const charCode = char.charCodeAt(0)

    msgChunks.push(charCode >>> 8, charCode & 0xFF)
  }

  console.log(msgChunks)

  return msgChunks
}
