import createShadowCanvas from  '../../src/util/create-shadow-canvas'
import wrapCanvas from '../../src/util/wrap-canvas'

const width = 10
const height = 10
let c
let wrap

describe('wrapCanvas', () => {
  beforeEach(() => {
    c = createShadowCanvas(width, height)
    wrap = wrapCanvas(c)
  })

  it('should return object with context set', () => {
    expect(wrap.context).toBe(c.getContext('2d'))
  })

  it('should return object with el set to canvas element', () => {
    expect(wrap.el).toBe(c)
  })

  it('should return object with getData method that returns canvas img data', () => {
    expect(wrap.getData().length).toBe(width * height * 3)
  })

  it('should return object with drawImage method that draws img to canvas', () => {
    expect(wrap.drawImage).toBeTruthy()
  })

  it('should return object with putData method that inserts img data to canvas', () => {
    expect(wrap.putData).toBeTruthy()
  })

  it('should consistently handle input and output of data', () => {
    const canvas = createShadowCanvas(2, 1)
    const wraped = wrapCanvas(canvas)
    const data = [0, 102, 0, 111, 0, 111]

    wraped.putData(data)

    expect(wraped.getData()).toEqual(data)
  })
})