var conf = require('../config');
var u = require('../util');
var CODE_UNIT_SIZE = conf.codeUnitSize;
var PRIME = u.findNextPrime(Math.pow(2, conf.t));

function getModMessage(data) {
  var i = 3; // first alpha value
  var modMessage = [];

  while(i < data.length) {
    if (u.isMessageCompleted(data, i)) break;

    modMessage.push(data[i] - (255 - PRIME + 1));
    i += 4; // step only through alpha values
  }

  return modMessage;
}

module.exports = function(image) {
  var q;
  var modMessage = [];
  var shadow;
  var data;
  var done;
  // loop vars
  var i;
  var k;

  image = image.length ? u.imageFromDataURL(image) : image;

  shadow = u.createShadowCanvas(image);
  data = shadow.imageData.data;

  modMessage = getModMessage(data);

  var message = '';
  var charCode = 0;
  var bitCount = 0;
  var mask = Math.pow(2, CODE_UNIT_SIZE) - 1;

  for (i = 0; i < modMessage.length; i += 1) {
    charCode += modMessage[i] << bitCount;
    bitCount += conf.t;

    if (bitCount >= CODE_UNIT_SIZE) {
      message += String.fromCharCode(charCode & mask);
      bitCount %= CODE_UNIT_SIZE;
      charCode = modMessage[i] >> (conf.t - bitCount);
    }
  }

  if (charCode !== 0) {
    message += String.fromCharCode(charCode & mask);
  }

  return message;
};
