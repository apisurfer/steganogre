import encode from '../../src/encode/index'

describe('encode', () => {
  it('should return the correct dataURL & download url', () => {
    const expectedURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAHUlEQVQIHQESAO3/AABmAP9vAG//AgD8AADyAAMAM4YFNhwjbZQAAAAASUVORK5CYII=';

    expect(encode('foobar').dataURL).toBe(expectedURL)
    expect(encode('foobar').downloadHref()).toBe(expectedURL.replace('image/png', 'image/octet-stream'))
  })
})
