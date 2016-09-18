import calculateDimension from '../../src/encode/calculate-dimension'

describe('encode', () => {
  describe('calculateDimension', () => {

    // best scenario. number that can represented as one value squared. same width and height
    it('should return identical width and height values if provided number can be squared without remainder', () => {
      expect(calculateDimension(25).width).toBe(5);
      expect(calculateDimension(25).height).toBe(5);

      expect(calculateDimension(16).width).toBe(4);
      expect(calculateDimension(16).height).toBe(4);

      expect(calculateDimension(64).width).toBe(8);
      expect(calculateDimension(64).height).toBe(8);
    })

    // if it can fit the remainder of the data it just adds one more row
    it('should return height thats 1px bigger than width if remainder is smaller than width', () => {
      expect(calculateDimension(27).width).toBe(5);
      expect(calculateDimension(27).height).toBe(6);

      expect(calculateDimension(17).width).toBe(4);
      expect(calculateDimension(17).height).toBe(5);

      expect(calculateDimension(71).width).toBe(8);
      expect(calculateDimension(71).height).toBe(9);
    })

    // for bigger remainders we append more rows; add pixels to height until we accomodate all the data
    it('should return height thats 1px bigger than width if remainder is smaller than width', () => {
      expect(calculateDimension(33).width).toBe(5);
      expect(calculateDimension(33).height).toBe(7);

      expect(calculateDimension(21).width).toBe(4);
      expect(calculateDimension(21).height).toBe(6);

      expect(calculateDimension(76).width).toBe(8);
      expect(calculateDimension(76).height).toBe(10);
    })
  })
})
