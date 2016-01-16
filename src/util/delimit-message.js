function delimitMessage(modMessage, threshold) {
  var delimiter = new Array(threshold * 3);
  var i;

  for(i = 0; i < delimiter.length; i++) {
    delimiter[i] = 255;
  }

  return delimiter;
}

module.exports = delimitMessage;
