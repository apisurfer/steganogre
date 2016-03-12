export default function createShadowCanvas(width, height) {
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  return {
    context,
    el: canvas,
    getData: () => context.getImageData(0, 0, width, height),
    drawImage: img => context.drawImage(img, 0, 0),
    putData: dataArray => {
      const imageData = context.createImageData(
        width,
        height
      )
      const data = imageData.data
      let dataArrayIndex = 0

      for (let i = 0; i < data.length; i += 4, dataArrayIndex += 3) {
        data[i] = dataArray[dataArrayIndex]
        data[i + 1] = dataArray[dataArrayIndex + 1]
        data[i + 2] = dataArray[dataArrayIndex + 2]
        data[i + 3] = 255 // opaque pixel; required for browser not to tamper with rgb color values
      }

      return context.putImageData(imageData, 0, 0)
    },
  }
}
