const DELIMITER_LENGTH = 9

export default function chunkMessage(msg) {
  const msgChunks = []

  for (let i = 0; i < msg.length; i++) {
    const char = msg[i]
    const charCode = char.charCodeAt(0)

    msgChunks.push(charCode >>> 8, charCode & 0xFF)
  }

  for (let i = 0; i < DELIMITER_LENGTH; i++) {
    msgChunks.push(0xFF)
  }

  return msgChunks
}
