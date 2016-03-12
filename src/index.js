import encode from './encode/'

const msg = 'abcdefg'
const canvas = encode(msg)

console.log(canvas.getData())

export default {
  encode,
}
