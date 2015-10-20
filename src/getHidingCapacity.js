var config = require('./config');

module.exports = function(image, options) {
  options = options || {};

  var width = options.width || image.width;
  var height = options.height || image.height;
  var t = options.t || config.t;
  var codeUnitSize = options.codeUnitSize || config.codeUnitSize;

  return t * width * height / codeUnitSize >> 0;
}