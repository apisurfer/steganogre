var config = require('./config');
var util = require('./util');
var imageFromDataURL = require('./imageFromDataURL');
var createShadowCanvas = require('./createShadowCanvas');

module.exports = function(message, image) {
  var shadow;
  var data;
  // bundlesPerChar ... Count of full t-bit-sized bundles per Character
  // overlapping ... Count of bits of the currently handled character which are not handled during each run
  var t = config.t;
  var threshold = config.threshold;
  var codeUnitSize = config.codeUnitSize;
  var bundlesPerChar = codeUnitSize / t >> 0;
  var overlapping = codeUnitSize % t;
  var messageDelimiter = config.messageDelimiter;
  var args = config.args;
  var prime = util.findNextPrime(Math.pow(2,t));
  var decM;
  var oldDec;
  var oldMask;
  var modMessage = [];
  var left;
  var right;
  // loop vars
  var i;
  var j;

  image = image.length ? imageFromDataURL(image) : image;

  shadow = createShadowCanvas(image);
  data = shadow.imageData.data;

  for (i = 0; i <= message.length; i += 1) {
    // dec ... UTF-16 Unicode of the i-th character of the message
    // curOverlapping ... The count of the bits of the previous character not handled in the previous run
    // mask ... The raw initial bitmask, will be changed every run and if bits are overlapping
    var dec = message.charCodeAt(i) || 0;
    var curOverlapping = (overlapping * i) % t;
    var mask;

    if (curOverlapping > 0 && oldDec) {
      mask = Math.pow(2,t - curOverlapping) - 1;
      oldMask = Math.pow(2, codeUnitSize) * (1 - Math.pow(2, -curOverlapping));
      left = (dec & mask) << curOverlapping;
      right = (oldDec & oldMask) >> (codeUnitSize - curOverlapping);
      modMessage.push(left + right);

      if (i < message.length) {
        mask = Math.pow(2,2 * t - curOverlapping) * (1 - Math.pow(2, -t));
        for (j = 1; j < bundlesPerChar; j += 1) {
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
      for (j = 0; j < bundlesPerChar; j += 1) {
        decM = dec & mask;
        modMessage.push(decM >> (j * t));
        mask <<= t;
      }
    }
    oldDec = dec;
  }

  // Write Data
  var offset;
  var index;
  var subOffset;
  var delimiter = messageDelimiter(modMessage,threshold);

  for (offset = 0; (offset + threshold) * 4 <= data.length && (offset + threshold) <= modMessage.length; offset += threshold) {
    var q, qS = [];
    for (i = 0; i < threshold && i + offset < modMessage.length; i += 1) {
      q = 0;
      for (j = offset; j < threshold + offset && j < modMessage.length; j += 1)
        q += modMessage[j] * Math.pow(args(i),j - offset);
      qS[i] = (255 - prime + 1) + (q % prime);
    }
    for (i = offset * 4; i < (offset + qS.length) * 4 && i < data.length; i += 4)
      data[i + 3] = qS[(i / 4) % threshold];

    subOffset = qS.length;
  }
  // Write message-delimiter
  for (index = (offset + subOffset); index - (offset + subOffset) < delimiter.length && (offset + delimiter.length) * 4 < data.length; index += 1)
    data[(index * 4) + 3] = delimiter[index - (offset + subOffset)];
  // Clear remaining data
  for (i = ((index + 1) * 4) + 3; i < data.length; i += 4) data[i] = 255;

  shadow.imageData.data = data;
  shadow.context.putImageData(shadow.imageData, 0, 0);

  return shadow.canvas.toDataURL();
};
