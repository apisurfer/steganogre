export default function setCanvasImageData (canvas, data) {
  const context = canvas.getContext('2d')
  const imageData = context.createImageData(canvas.width, canvas.height)

  for (let i = 0, dataArrayIndex = 0; i < imageData.data.length; i += 4, dataArrayIndex += 3) {
    imageData.data[i] = data[dataArrayIndex]
    imageData.data[i + 1] = data[dataArrayIndex + 1]
    imageData.data[i + 2] = data[dataArrayIndex + 2]
    imageData.data[i + 3] = 255 // opaque pixel; required for browser not to tamper with rgb color values
  }

  context.putImageData(imageData, 0, 0)
}
