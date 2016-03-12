import encode from './encode/'
import decode from './decode'

const msg = 'abcdefg'
const canvas = encode(msg)

console.log(canvas.getData())

console.log(
  'RESULT: ',
  decode(canvas.getData())
)

export default {
  encode,
  decode,
}
