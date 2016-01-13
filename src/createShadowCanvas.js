module.exports = function createShadowCanvas(image) {
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  if (image.length) {
    var dataURL = image;
    image = new Image();
    image.src = dataURL;
  }

  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0, canvas.width, canvas.height );
  imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  return {
    canvas: canvas,
    context: context,
    imageData: imageData,
  };
}
