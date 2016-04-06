import createShadowCanvas from '../../src/util/create-shadow-canvas'

describe('createShadowCanvas', () => {
  it('should return element with CANVAS nodeName', () => {
    expect(createShadowCanvas(1,1).nodeName).toBe('CANVAS')
  })

  it('should return element with appropriate dimensions', () => {
    const canvas = createShadowCanvas(1337, 400)
    expect(canvas.width).toBe(1337)
    expect(canvas.height).toBe(400)
  })
})
