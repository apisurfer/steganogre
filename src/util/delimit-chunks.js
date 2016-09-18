import delimiter from './delimiter'

export default function delimitChunks (msgChunks) {
  return msgChunks.concat(delimiter())
}
