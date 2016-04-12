import createShadowCanvas from '../../src/util/create-shadow-canvas'

describe('createShadowCanvas', () => {
  it('should use canvas passed as argument', () => {
    const c = document.createElement('canvas')
    const newC = createShadowCanvas(2, 3, c)

    expect(newC).toBe(c)
    expect(newC.width).toBe(2)
    expect(newC.height).toBe(3)
  })

  it('should return element with CANVAS nodeName', () => {
    expect(createShadowCanvas(1,1).nodeName).toBe('CANVAS')
  })

  it('should return element with appropriate dimensions', () => {
    const canvas = createShadowCanvas(1337, 400)

    expect(canvas.width).toBe(1337)
    expect(canvas.height).toBe(400)
  })
})
