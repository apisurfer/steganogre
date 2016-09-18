import delimitChunks from '../../src/util/delimit-chunks'
import delimiter from '../../src/util/delimiter'

describe('delimitChunks', () => {
  it('should correctly end chunk array with delimiter', () => {
    expect(delimitChunks([1, 2, 3])).toEqual([1, 2, 3].concat(delimiter()))
    expect(delimitChunks([1, 2, 3, 4])).toEqual([1, 2, 3, 4].concat(delimiter()))
    expect(delimitChunks([1, 2, 3, 255])).toEqual([1, 2, 3, 255].concat(delimiter()))
    expect(delimitChunks([1, 2, 3, 255, 255])).toEqual([1, 2, 3, 255, 255].concat(delimiter()))
  })
})
