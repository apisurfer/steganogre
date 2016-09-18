import getCanvasImageData from '../../src/util/get-canvas-image-data'
import createCanvas from '../../src/util/create-canvas'

describe('getCanvasImageData', () => {
  it('should return canvas image data in form of an Uint8ClampedArray', () => {
    const canvas = createCanvas()
    const canvasImageData = getCanvasImageData(canvas)

    expect(canvasImageData instanceof Uint8ClampedArray).toBe(true)

    expect(Array.from(canvasImageData))
      .toEqual([0,0,0,0])
  })
})
