import delimiter from '../../src/util/delimiter'

describe('delimiter', () => {
  it('should return array containing 9 255 values', () => {
    const d = delimiter()
    expect(d.length).toBe(9)
    d.forEach(function (i) {
      expect(i).toBe(255)
    })
  })
})
