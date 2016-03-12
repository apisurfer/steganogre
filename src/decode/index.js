import createShadowCanvas from '../util/create-shadow-canvas'
import wrapCanvas from '../util/wrap-canvas'
import extractMessage from './extract-message'

export default function decode(imageURL) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous' // enable cross origin content

    img.onload = () => {
      const wrappedCanvas = wrapCanvas(
        createShadowCanvas(
          img.width,
          img.height
        )
      )

      wrappedCanvas.drawImage(img)
      resolve(
        extractMessage(
          wrappedCanvas.getData()
        )
      )
    }

    img.src = imageURL;
  })
}
