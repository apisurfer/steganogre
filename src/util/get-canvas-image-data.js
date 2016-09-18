export default function getCanvasImageData (canvas) {
  return canvas
    .getContext('2d')
    .getImageData(0,0, canvas.width, canvas.height)
    .data
}
