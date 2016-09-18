import getCanvasImageData from '../../src/util/get-canvas-image-data'
import createCanvas from '../../src/util/create-canvas'

describe('getCanvasImageData', () => {
  it('should return canvas image data in form of an array', () => {
    const canvas = createCanvas()

    expect(getCanvasImageData(canvas).length)
      .toBe(canvas.width * canvas.height * 4)
  })
})
