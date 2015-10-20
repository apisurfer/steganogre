var config = require('./config');
var util = require('./util');

module.exports = function(message, image, options) {
  var shadowCanvas = document.createElement('canvas');
  var shadowCtx = shadowCanvas.getContext('2d');
  var dataURL;

  options = options || {};
  shadowCanvas.style.display = 'none';

  if (image.length) {
    dataURL = image;
    image = new Image();
    image.src = dataURL;
  }

  shadowCanvas.width = options.width || image.width;
  shadowCanvas.height = options.height || image.height;

  if (options.height && options.width) {
    shadowCtx.drawImage(image, 0, 0, options.width, options.height);
  } else {
    shadowCtx.drawImage(image, 0, 0);
  }

  var imageData = shadowCtx.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height),
  data = imageData.data;
  // bundlesPerChar ... Count of full t-bit-sized bundles per Character
  // overlapping ... Count of bits of the currently handled character which are not handled during each run
  var t = options.t || config.t;
  var threshold = options.threshold || config.threshold;
  var codeUnitSize = options.codeUnitSize || config.codeUnitSize;
  var bundlesPerChar = codeUnitSize / t >> 0;
  var overlapping = codeUnitSize % t;
  var messageDelimiter = options.messageDelimiter || config.messageDelimiter;
  var args = options.args || config.args;
  var prime = util.findNextPrime(Math.pow(2,t));
  var decM, oldDec, oldMask, modMessage = [], left, right;

  for (var i = 0; i <= message.length; i += 1) {
    // dec ... UTF-16 Unicode of the i-th character of the message
    // curOverlapping ... The count of the bits of the previous character not handled in the previous run
    // mask ... The raw initial bitmask, will be changed every run and if bits are overlapping
    var dec = message.charCodeAt(i) || 0, curOverlapping = (overlapping * i) % t, mask;
    if (curOverlapping > 0 && oldDec) {
      mask = Math.pow(2,t - curOverlapping) - 1;
      oldMask = Math.pow(2, codeUnitSize) * (1 - Math.pow(2, -curOverlapping));
      left = (dec & mask) << curOverlapping;
      right = (oldDec & oldMask) >> (codeUnitSize - curOverlapping);
      modMessage.push(left + right);

      if (i < message.length) {
        mask = Math.pow(2,2 * t - curOverlapping) * (1 - Math.pow(2, -t));
        for (var j = 1; j < bundlesPerChar; j += 1) {
          decM = dec & mask;
          modMessage.push(decM >> (((j - 1) * t) + (t - curOverlapping)));
          mask <<= t;
        }
        if ((overlapping * (i + 1)) % t === 0) {
          mask = Math.pow(2, codeUnitSize) * (1 - Math.pow(2,-t));
          decM = dec & mask;
          modMessage.push(decM >> (codeUnitSize - t));
        } else if (((((overlapping * (i + 1)) % t) + (t - curOverlapping)) <= t)) {
          decM = dec & mask;
          modMessage.push(decM >> (((bundlesPerChar - 1) * t) + (t - curOverlapping)));
        }
      }
    } else if (i < message.length) {
      mask = Math.pow(2,t) - 1;
      for (var j = 0; j < bundlesPerChar; j += 1) {
        decM = dec & mask;
        modMessage.push(decM >> (j * t));
        mask <<= t;
      }
    }
    oldDec = dec;
  }

  // Write Data
  var offset, index, subOffset, delimiter = messageDelimiter(modMessage,threshold);
  for (offset = 0; (offset + threshold) * 4 <= data.length && (offset + threshold) <= modMessage.length; offset += threshold) {
    var q, qS = [];
    for (var i = 0; i < threshold && i + offset < modMessage.length; i += 1) {
      q = 0;
      for (var j = offset; j < threshold + offset && j < modMessage.length; j += 1)
        q += modMessage[j] * Math.pow(args(i),j - offset);
      qS[i] = (255 - prime + 1) + (q % prime);
    }
    for (var i = offset * 4; i < (offset + qS.length) * 4 && i < data.length; i += 4)
      data[i + 3] = qS[(i / 4) % threshold];

    subOffset = qS.length;
  }
  // Write message-delimiter
  for (index = (offset + subOffset); index - (offset + subOffset) < delimiter.length && (offset + delimiter.length) * 4 < data.length; index += 1)
    data[(index * 4) + 3] = delimiter[index - (offset + subOffset)];
  // Clear remaining data
  for (var i = ((index + 1) * 4) + 3; i < data.length; i += 4) data[i] = 255;

    imageData.data = data;
  shadowCtx.putImageData(imageData, 0, 0);

  return shadowCanvas.toDataURL();
};
