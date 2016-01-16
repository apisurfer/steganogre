![mascot](steganogre.png)


# SteganOgre.js

**Front-end** library for storing messages inside image data.
Based on Steganographyjs but this will most likely be a complete rewrite in the long run. For now it's mostly just decoupled, cleaned up and prepared for usage through npm or as globally exposed lib.


## why do it in the browser?
- no dependency on any software other than the browser
- no dependency on 3rd party service
- support for embedding messages to image formats that browser supports, exports will be pngs and jpgs though
- opens a possibility of storing and retrieving web content without using any type of backend(well at least not yours :)) + it might be hard for network to figure out the nature of the content(fun times; working on it :))


Future goals for this lib:

- enable passing custom functions for encoding & decoding of messages(think passing cryptographic functions that encrypt the message before it's embedded to the picture) and that can read the content after that
- enable passing custom functions that do the actual steganographic process on the image data
