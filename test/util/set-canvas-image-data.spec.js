import setCanvasImageData from '../../src/util/set-canvas-image-data'
import getCanvasImageData from '../../src/util/get-canvas-image-data'
import createCanvas from '../../src/util/create-canvas'

describe('setCanvasImageData', () => {
  it('should set the provided data on the cavnas instance', () => {
    const canvas = createCanvas()
    const initialData = getCanvasImageData(canvas)

    expect(Array.from(initialData)).toEqual([0, 0, 0, 0])
    setCanvasImageData(canvas, [1, 2, 3])
    expect(Array.from(getCanvasImageData(canvas))).toEqual([1, 2, 3, 255])
  })
})
