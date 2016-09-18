import encode from '../../src/encode/index'

const expectedURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAYAAACk7+45AAAAKElEQVQIW2NkSGP4nz8rn4GRIYnhf+K8IgbG/////2dgYIAwGBkZGQDwWg2vhr1KOQAAAABJRU5ErkJggg=='

describe('encode', () => {
  it('should return the correct dataURL', () => {
    expect(encode.encodeString('foobar').dataURL).toEqual(expectedURL)
  })

  it('should return the correct download url', () => {
    expect(encode.encodeString('foobar').downloadHref()).toEqual(expectedURL.replace('image/png', 'image/octet-stream'))
  })
})
