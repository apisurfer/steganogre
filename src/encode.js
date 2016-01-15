var config = require('./config');
var util = require('./util');
var imageFromDataURL = require('./imageFromDataURL');
var createShadowCanvas = require('./createShadowCanvas');

var shadow;
var data;
var t = config.t;
var threshold = config.threshold;
var codeUnitSize = config.codeUnitSize;
// bundlesPerChar ... Count of full t-bit-sized bundles per Character
// overlapping ... Count of bits of the currently handled character which are not handled during each run
var bundlesPerChar = codeUnitSize / t >> 0;
var overlapping = codeUnitSize % t;
var messageDelimiter = config.messageDelimiter;
var args = config.args;
var prime = util.findNextPrime(Math.pow(2, t));
var decM;
var oldDec;
var oldMask;
var modMessage = [];
var left;
var right;
// loop vars
var i;
var j;

function clearRemainingData(startIndex, data) {
  var i;
  var startAt = ((startIndex + 1) * 4) + 3;

  for (i = startAt; i < data.length; i += 4) {
    data[i] = 255;
  }

  return data;
}

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

  for (j = offset; j < threshold + offset && j < modMessage.length; j++) {
    q += modMessage[j] * Math.pow(args(index), j - offset);
  }

  return q;
}

function calculateQs(offset, modMessage) {
  var i;
  var q;
  var qS = [];

  for (i = 0; i < threshold && i + offset < modMessage.length; i++) {
    q = calculateQ(offset, modMessage, i);
    qS[i] = (255 - prime + 1) + (q % prime);
  }

  return qS;
}

function alterImageData(qS, offset, data) {
  var i;

  for (i = offset * 4; i < (offset + qS.length) * 4 && i < data.length; i += 4) {
    data[i + 3] = qS[(i / 4) % threshold];
  }

  return data;
}

function writeMessage(imgData, modMessage) {
  var qS;
  var offset;

  for (offset = 0; (offset + threshold) * 4 <= imgData.length && (offset + threshold) <= modMessage.length; offset += threshold) {
    qS = calculateQs(offset, modMessage);
    imgData = alterImageData(qS, offset, imgData);
  }

  return {
    offset: offset,
    qSLength: qS.length,
    data: imgData,
  };
}

module.exports = function(message, image) {
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
        mask = Math.pow(2, 2 * t - curOverlapping) * (1 - Math.pow(2, -t));

        for (j = 1; j < bundlesPerChar; j += 1) {
          decM = dec & mask;
          modMessage.push(decM >> (((j - 1) * t) + (t - curOverlapping)));
          mask <<= t;
        }

        if ((overlapping * (i + 1)) % t === 0) {
          mask = Math.pow(2, codeUnitSize) * (1 - Math.pow(2, -t));
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
  var delimiter = messageDelimiter(modMessage, threshold);
  var newImgInfo = writeMessage(data, modMessage);
  var delimiterInfo = writeMessageDelimiter(newImgInfo.offset, newImgInfo.qSLength, delimiter, newImgInfo.data);
  data = clearRemainingData(delimiterInfo.stoppedAt, delimiterInfo.data);

  shadow.imageData.data = data;
  shadow.context.putImageData(shadow.imageData, 0, 0);

  return shadow.canvas.toDataURL();
};
