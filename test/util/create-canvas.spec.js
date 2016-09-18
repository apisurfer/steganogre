import createCanvas from '../../src/util/create-canvas'

describe('createCanvas', () => {
  it('should create a canvas element width 0x0 dimensions', () => {
    const c = createCanvas()
    expect(c.nodeName).toBe('CANVAS')
    expect(c.width).toBe(0)
    expect(c.height).toBe(0)
  })
})
