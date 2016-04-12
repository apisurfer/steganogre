export default function createShadowCanvas(width, height, existingCanvas) {
  // makes possible to use it by nodejs backend
  const canvas = existingCanvas || document.createElement('canvas')

  canvas.width = width
  canvas.height = height

  return canvas
}
