var findNextPrime = require('./find-next-prime');
var sum = require('./sum');
var product = require('./product');
var delimitMessage = require('./delimit-message');
var isMessageCompleted = require('./is-message-completed');
var createShadowCanvas = require('./create-shadow-canvas');
var imageFromDataURL = require('./image-from-dataurl');
var getHidingCapacity = require('./get-hidding-capacity');

module.exports = {
  findNextPrime: findNextPrime,
  sum: sum,
  product: product,
  delimitMessage: delimitMessage,
  isMessageCompleted: isMessageCompleted,
  createShadowCanvas: createShadowCanvas,
  imageFromDataURL: imageFromDataURL,
  getHidingCapacity: getHidingCapacity,
};
