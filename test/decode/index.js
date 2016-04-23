import 'babel-polyfill'
import decode from '../../src/decode/index'

const imgURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAYAAACk7+45AAAAKElEQVQIW2NkSGP4nz8rn4GRIYnhf+K8IgbG/////2dgYIAwGBkZGQDwWg2vhr1KOQAAAABJRU5ErkJggg=='

describe('decode', () => {
  it('should return Promise', () => {
    expect(decode(imgURI) instanceof Promise).toBe(true)
  })

  it('should return correct value', (done) => {
    decode(imgURI).then(data => {
      expect(data).toBe('foobar')
      done()
    })
  })
})
