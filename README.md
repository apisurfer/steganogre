![mascot](steganogre.png)


# SteganOgre.js

**Front-end** library for storing and retrieving messages from image data.

## encode

```javascript
var steganogre = require('steganogre')
var encoded = steganogre.encodeString('your message')
var img = new Image()
var a = document.createElement('a')

img.src = encoded.dataURL // set generated imageData to img element src to preview it
a.href = encoded.downloadHref() // set download link for generated image with encoded data
```

## decode

```javascript
var steganogre = require('steganogre')
var decoding = steganogre.decodeToString('http://imgur.com/URL_TO_YOUR_IMAGE_WITH_ENCODED_MESSAGE')

decoding.then(function(msg) {
  console.log(msg)
})
```

## Additional notes

### Encryption
Data is stored as is into RGB channels of image data. If you want encrypted/protected
content you need to handle that part yourself and pass cyphertext to **steganogre.encodeString**
method.

### CORS
If you are trying to retrieve image data with **steganogre.decodeString** from different URI scheme
and it doesn't work, it's probably because source server is not set up with
appropriate CORS headers(check out console error output).
3rd party services that do set appropriate CORS headers are imgur and dropbox
