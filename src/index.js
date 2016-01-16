/*
 * SteganOgre.js
 *
 * almost completely rewritten Steganography.js library by Peter Eigenschink (http://www.peter-eigenschink.at/)
 * to be more modular, testable and usable throuh npm
 *
 */

var encode = require('./encode');
var decode = require('./decode');
var getHidingCapacity = require('./util').getHidingCapacity;

module.exports = {
  encode: encode,
  decode: decode,
  getHidingCapacity: getHidingCapacity,
};
