/**
 * Creates obj for handling the shadow canvas and its image data
 * image data passed to putData is expected to be string chunked to 8bit int array
 * 2 chunks per char since js uses utf-16
 */
export default function wrapCanvas(canvas) {
  const context = canvas.getContext('2d')
  const { width, height } = canvas

  return {
    context,
    el: canvas,
    getData: () => context.getImageData(0, 0, width, height).data,
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

      context.putImageData(imageData, 0, 0)

      return data
    },
  }
}
