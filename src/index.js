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

function initLibrary() {
  return {
    encode: encode,
    decode: decode,
    getHidingCapacity: getHidingCapacity,
  };
}

// expose for commonjs, amd and globs
(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('steganogre', initLibrary));

// TODO: remove this code; only used while hackking together inital version
window.steg = initLibrary();