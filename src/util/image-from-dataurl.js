module.exports = function imageFromDataURL(dataURL) {
  var image = new Image();
  image.src = dataURL;

  return image;
};
