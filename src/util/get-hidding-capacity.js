var config = require('../config');

module.exports = function(image) {
  if (!image.width || !image.height) return 0;
  return config.t * image.width * image.height / config.codeUnitSize >> 0;
};
