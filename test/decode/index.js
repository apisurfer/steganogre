import 'babel-polyfill'
import decode from '../../src/decode/index'

const imgURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAHUlEQVQIHQESAO3/AABmAP9vAG//AgD8AADyAAMAM4YFNhwjbZQAAAAASUVORK5CYII='

describe('decode', () => {
  it('should return Promise', () => {
    expect(decode(imgURI) instanceof Promise).toBe(true)
  })

  // TODO: test response
})
