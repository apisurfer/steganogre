![mascot](steganogre-med.png)


# SteganOgre.js

Library for **encoding** & **decoding** messages to images.
Primarily for front-end but can also be used inside nodejs(take a look at dist/cli.js) with `canvas` npm module.

## API

- `encodeString(message/* string */, [existingCanvas/* object */])`
- `encodeUint8Array(message/* string */, [existingCanvas/* object */])`
- `decodeToString(imageUrl/* string */, [existingCanvas/* object */])`
- `decodeToUint8Array(imageUrl/* string */, [existingCanvas/* object */])`

**existingCanvas** parameter is optional in front-end implementations. You can use it if you already have canvas elements lying around. However, it's required in nodejs implementations because that JS environment does not provide "document.createElement" API.

*Encode* methods return object with **dataURL** property(image URI data), and **downloadHref** method that can be used to set up anchors href attribute to download the content.
*Decode* methods return promise that gets resolved once the data is processed.

## Usage examples

```javascript
var steganogre = require('steganogre')

/* ENCODE */

// string to image
var encoded = steganogre.encodeString('message to encode')

// to preview
var img = new Image()
img.src = encoded.dataURL // set generated imageData to img element src to preview it

// to download
var a = document.createElement('a')
a.href = encoded.downloadHref() // set download link for generated image with encoded data

// Uint8Array to image
var encodedArray = steganogre.encodeUint8Array([123, 221, 111, 88])
// print image data URI
console.log(encodedArray.dataURL)

/* DECODE */

var imageUrl = 'http://imgur.com/xxxxxxxx' // can also be image data uri
steganogre.decodeToString(imageUrl).then(function(msg) {
  console.log(msg)
})

steganogre.decodeToUint8Array(imageUrl).then(function(msgChunks) {
  console.log(msgChunks)
})

```

## Additional notes

### Encryption & Privacy
For now the data is stored "as is" into RGB channels of image data(to take as little space as possible).  If you want encrypted/protected content you need to handle that part yourself and pass cyphertext to some of the encode methods. Little "wrapper" app that offers encryption using [triplesec](https://keybase.io/triplesec/) is [Medusa's Path](https://github.com/popc0rn/medusas-path).

### CORS
If you are trying to retrieve image data with some of *decode* methods from different URI scheme and it doesn't work, it's probably because source server is not set up with appropriate CORS headers(check out console error output). 3rd party services that do set appropriate CORS headers are **imgur** and **dropbox**.
