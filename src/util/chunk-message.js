const charByteLength = 2 // js uses utf-16 for its source code and string type encoding

export default function chunkMessage(msg) {
  const msgChunks = []

  for (let i = 0; i < msg.length; i++) {
    const char = msg[i]
    const charCode = char.charCodeAt(0)

    msgChunks.push(charCode >>> 8, charCode & 0xFF)
  }

  return msgChunks
}
