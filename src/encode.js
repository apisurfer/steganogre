var config = require('./config');
var util = require('./util');
var imageFromDataURL = require('./imageFromDataURL');
var createShadowCanvas = require('./createShadowCanvas');

var T = config.t;
var THRESHOLD = config.threshold;
var CODE_UNIT_SIZE = config.codeUnitSize;
// BUNDLES_PER_CHAR ... Count of full t-bit-sized bundles per Character
var BUNDLES_PER_CHAR = CODE_UNIT_SIZE / T >> 0;
// OVERLAPPING ... Count of bits of the currently handled character which are not handled during each run
var OVERLAPPING = CODE_UNIT_SIZE % T;
var PRIME = util.findNextPrime(Math.pow(2, T));
var delimitMessage = config.delimitMessage;

// mutates data
function clearRemainingData(startIndex, data) {
  var i;
  var startAt = ((startIndex + 1) * 4) + 3;

  for (i = startAt; i < data.length; i += 4) {
    data[i] = 255;
  }

  return data;
}

// mutates data
function writeMessageDelimiter(offset, subOffset, delimiter, data) {
  var composedOffset = offset + subOffset;
  var step;
  var index;

  for (index = composedOffset; index - composedOffset < delimiter.length && (offset + delimiter.length) * 4 < data.length; index++) {
    step = (index * 4) + 3;
    data[step] = delimiter[index - composedOffset];
  }

  return {
    data: data,
    stoppedAt: index,
  };
}

function calculateQ(offset, modMessage, index) {
  var j;
  var q = 0;

  for (j = offset; j < THRESHOLD + offset && j < modMessage.length; j++) {
    q += modMessage[j] * Math.pow(index + 1, j - offset);
  }

  return q;
}

function calculateQs(offset, modMessage) {
  var i;
  var q;
  var qS = [];

  for (i = 0; i < THRESHOLD && i + offset < modMessage.length; i++) {
    q = calculateQ(offset, modMessage, i);
    qS[i] = (255 - PRIME + 1) + (q % PRIME);
  }

  return qS;
}

// mutates data
function alterImageData(qS, offset, data) {
  var i;

  for (i = offset * 4; i < (offset + qS.length) * 4 && i < data.length; i += 4) {
    data[i + 3] = qS[(i / 4) % THRESHOLD];
  }

  return data;
}

function writeMessage(imgData, modMessage) {
  var qS;
  var offset;

  for (offset = 0; (offset + THRESHOLD) * 4 <= imgData.length && (offset + THRESHOLD) <= modMessage.length; offset += THRESHOLD) {
    qS = calculateQs(offset, modMessage);
    imgData = alterImageData(qS, offset, imgData);
  }

  return {
    offset: offset,
    qSLength: qS.length,
    data: imgData,
  };
}

function encodeMessage(message) {
  var i;
  var j
  var oldDec;
  var oldMask;
  var decM;
  // dec ... UTF-16 Unicode of the i-th character of the message
  var dec;
  // curOverlapping ... The count of the bits of the previous character not handled in the previous run
  var curOverlapping;
  // mask ... The raw initial bitmask, will be changed every run and if bits are OVERLAPPING
  var mask;
  var modMessage = [];
  var left;
  var right;

  for (i = 0; i <= message.length; i++) {
    dec = message.charCodeAt(i) || 0;
    curOverlapping = (OVERLAPPING * i) % T;

    if (curOverlapping > 0 && oldDec) {
      mask = Math.pow(2, T - curOverlapping) - 1;
      oldMask = Math.pow(2, CODE_UNIT_SIZE) * (1 - Math.pow(2, -curOverlapping));
      left = (dec & mask) << curOverlapping;
      right = (oldDec & oldMask) >> (CODE_UNIT_SIZE - curOverlapping);
      modMessage.push(left + right);

      if (i < message.length) {
        mask = Math.pow(2, 2 * T - curOverlapping) * (1 - Math.pow(2, -T));

        for (j = 1; j < BUNDLES_PER_CHAR; j++) {
          decM = dec & mask;
          modMessage.push(decM >> (((j - 1) * T) + (T - curOverlapping)));
          mask <<= T;
        }

        if ((OVERLAPPING * (i + 1)) % T === 0) {
          mask = Math.pow(2, CODE_UNIT_SIZE) * (1 - Math.pow(2, -T));
          decM = dec & mask;
          modMessage.push(decM >> (CODE_UNIT_SIZE - T));
        } else if (((((OVERLAPPING * (i + 1)) % T) + (T - curOverlapping)) <= T)) {
          decM = dec & mask;
          modMessage.push(decM >> (((BUNDLES_PER_CHAR - 1) * T) + (T - curOverlapping)));
        }
      }
    } else if (i < message.length) {
      mask = Math.pow(2, T) - 1;

      for (j = 0; j < BUNDLES_PER_CHAR; j++) {
        decM = dec & mask;
        modMessage.push(decM >> (j * T));
        mask <<= T;
      }
    }

    oldDec = dec;
  }

  return modMessage;
}

module.exports = function(message, image) {
  var shadow;
  var data;
  var encodedMessage;

  image = image.length ? imageFromDataURL(image) : image;
  shadow = createShadowCanvas(image);
  data = shadow.imageData.data;

  // Encode message
  encodedMessage = encodeMessage(message);

  // Write Data
  var delimiter = delimitMessage(encodedMessage, THRESHOLD);
  var newImgInfo = writeMessage(data, encodedMessage);
  var delimiterInfo = writeMessageDelimiter(newImgInfo.offset, newImgInfo.qSLength, delimiter, newImgInfo.data);
  data = clearRemainingData(delimiterInfo.stoppedAt, delimiterInfo.data);

  shadow.imageData.data = data;
  shadow.context.putImageData(shadow.imageData, 0, 0);

  return shadow.canvas.toDataURL();
};
