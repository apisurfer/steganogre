import clearTrailingData from '../../src/decode/clear-trailing-data'

describe('decode', () => {
  describe('clearTrailingData', () => {
    it('should clear the non used data from the canvas image data ending', () => {
      expect(clearTrailingData([0, 102, 0, 111, 0, 111, 0])).toEqual([0, 102, 0, 111, 0, 111])
      expect(clearTrailingData([0, 102, 0, 111, 0, 111, 0, 0])).toEqual([0, 102, 0, 111, 0, 111])
      expect(clearTrailingData([0, 102, 0, 111, 0, 111, 0, 0, 0])).toEqual([0, 102, 0, 111, 0, 111])
      expect(clearTrailingData([0, 102, 0, 111, 0, 111, 0, 0, 0, 0])).toEqual([0, 102, 0, 111, 0, 111])
    })
  })
})
