import chunkMessage from './chunk-message'

export default function encode(canvas, msg) {
  const chunks = chunkMessage(msg)

  return canvas.putData(chunks)
}
