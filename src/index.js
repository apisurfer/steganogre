import encode from './encode/'
import decode from './decode'

const msg = `32j4rwelq;fadsk;fjdalsn cmansmč{{s}};'la;dkf;ksafojawpok23;m432u482345678900)*&^%$#@kasmc./'`
const canvas = encode(msg)

console.log(canvas.getData())
console.log(msg)
console.log(decode(canvas.getData()))

export default {
  encode,
  decode,
}
