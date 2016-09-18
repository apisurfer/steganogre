import delimiter from '../util/delimiter'

export default function(chunks) {
  return chunks.concat(delimiter())
}
