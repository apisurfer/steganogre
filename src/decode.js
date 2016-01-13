var config = require('./config');
var util = require('./util');
var imageFromDataURL = require('./imageFromDataURL');
var createShadowCanvas = require('./createShadowCanvas');
var messageCompleted = config.messageCompleted;
var args = config.args;
var t = config.t;
var threshold = config.threshold;
var codeUnitSize = config.codeUnitSize;
var prime = util.findNextPrime(Math.pow(2, t));

function getModMessage(data) {
  var i = 3; // first alpha value
  var modMessage = [];

  while(i < data.length) {
    if (messageCompleted(data, i)) break;

    modMessage.push(data[i] - (255 - prime + 1));
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

  if (!t || (t < 1 || t > 7)) throw 'Error: Parameter t = ' + t + ' is not valid: 0 < t < 8';

  image = image.length ? imageFromDataURL(image) : image;

  shadow = createShadowCanvas(image);
  data = shadow.imageData.data;

  modMessage = getModMessage(data);

  var message = '';
  var charCode = 0;
  var bitCount = 0;
  var mask = Math.pow(2, codeUnitSize) - 1;

  for (i = 0; i < modMessage.length; i += 1) {
    charCode += modMessage[i] << bitCount;
    bitCount += t;

    if (bitCount >= codeUnitSize) {
      message += String.fromCharCode(charCode & mask);
      bitCount %= codeUnitSize;
      charCode = modMessage[i] >> (t - bitCount);
    }
  }

  if (charCode !== 0) {
    message += String.fromCharCode(charCode & mask);
  }

  return message;
};
