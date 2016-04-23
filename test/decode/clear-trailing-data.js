import clearTrailingData from '../../src/decode/clear-trailing-data'

const delimiter = [255, 255, 255, 255, 255, 255, 255, 255, 255]

describe('decode', () => {
  describe('clearTrailingData', () => {
    it('should clear the non used data from the canvas image data ending', () => {
      expect(
        clearTrailingData(
          [0, 102, 0, 111, 0, 111, 0].concat(delimiter)
        )
      ).toEqual([0, 102, 0, 111, 0, 111, 0])

      expect(
        clearTrailingData(
          [0, 102, 0, 111, 0, 111, 0, 0].concat(delimiter)
        )
      ).toEqual([0, 102, 0, 111, 0, 111, 0, 0])

      expect(
        clearTrailingData(
          [0, 102, 0, 111, 0, 111, 0, 0, 0].concat(delimiter)
        )
      ).toEqual([0, 102, 0, 111, 0, 111, 0, 0, 0])

      expect(
        clearTrailingData(
          [0, 102, 0, 111, 0, 111, 0, 0, 0, 0].concat(delimiter)
        )
      ).toEqual([0, 102, 0, 111, 0, 111, 0, 0, 0, 0])

      expect(
        clearTrailingData(
          [0, 102, 0, 111, 0, 111, 255].concat(delimiter)
        )
      ).toEqual([0, 102, 0, 111, 0, 111, 255])

      expect(
        clearTrailingData(
          [0, 102, 0, 111, 0, 111, 0, 255].concat(delimiter)
        )
      ).toEqual([0, 102, 0, 111, 0, 111, 0, 255])
    })
  })
})
