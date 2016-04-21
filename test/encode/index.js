import encode from '../../src/encode/index'

describe('encode', () => {
  it('should return the correct dataURL', () => {
    const expectedURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGklEQVQIW2NkSGP4nz8rn4GRIYnhf+K8IgYAMgoFsr/d3psAAAAASUVORK5CYII=';

    expect(encode('foobar').dataURL).toEqual(expectedURL)
  })

  it('should return the correct download url', () => {
    const expectedURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGklEQVQIW2NkSGP4nz8rn4GRIYnhf+K8IgYAMgoFsr/d3psAAAAASUVORK5CYII=';

    expect(encode('foobar').downloadHref()).toEqual(expectedURL.replace('image/png', 'image/octet-stream'))
  })
})
