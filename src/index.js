/*
 * SteganOgre.js
 *
 * Based on Steganography.js by Peter Eigenschink (http://www.peter-eigenschink.at/)
 * Dual-licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and the Beerware (http://en.wikipedia.org/wiki/Beerware) license.
 */

var encode = require('./encode');
var decode = require('./decode');
var getHidingCapacity = require('./getHidingCapacity');

module.exports = {
  encode: encode,
  decode: decode,
  getHidingCapacity,
};

window.steganography = window.steg = module.exports;
