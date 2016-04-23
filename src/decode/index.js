import createShadowCanvas from '../util/create-shadow-canvas'
import wrapCanvas from '../util/wrap-canvas'
import clearTrailingData from './clear-trailing-data'
import extractMessage from './extract-message'

function decodeToUint8Array(imageURL, existingCanvas) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous' // enable cross origin content

    img.onload = () => {
      const wrappedCanvas = wrapCanvas(
        createShadowCanvas(
          img.width,
          img.height,
          existingCanvas
        )
      )

      wrappedCanvas.drawImage(img)

      resolve(
        clearTrailingData(
          wrappedCanvas.getData()
        )
      )
    }

    img.src = imageURL;
  })
}


export default {
  decodeToString(imageURL, existingCanvas) {
    return decodeToUint8Array(imageURL, existingCanvas).then(chunks => Promise.resolve(extractMessage(chunks)))
  },

  decodeToUint8Array,
}
