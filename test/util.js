var util = require('../src/util');
var config  = require('../src/config');
var isPrime = util.isPrime;
var findNextPrime = util.findNextPrime;
var sum = util.sum;
var product = util.product;
var createArrayFromArgs = util.createArrayFromArgs;

function mul3(n) { return n * 3; }
function undef(n) {}
function nan(n) { return NaN; }
function zero(n) { return 0; }
function same(n) { return n; }
function tricky(n) { return n % 5 === 0 ? false : n; }

var opts = {
  start: 5,
  inc: 2,
  defValue: 14,
};

var optsNoStart = {
  inc: 1,
  defValue: 14,
};

var optsNoInc = {
  start: 5,
  defValue: 14,
};

describe('util.isPrime', function () {
  it('should return false for non-prime numbers', function () {
    expect(isPrime(-7)).toBe(false);
    expect(isPrime(Infinity)).toBe(false);
    expect(isPrime(-Infinity)).toBe(false);
    expect(isPrime(NaN)).toBe(false);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(6)).toBe(false);
    expect(isPrime(2048)).toBe(false);
  });

  it('should return true for prime numbers', function () {
    expect(isPrime(3)).toBe(true);
    expect(isPrime(5)).toBe(true);
    expect(isPrime(13)).toBe(true);
    expect(isPrime(983)).toBe(true);
    expect(isPrime(2699)).toBe(true);
    expect(isPrime(3691)).toBe(true);
  });
});


describe('util.findNextPrime', function () {
  it('should return the same number if given prime', function () {
    expect(findNextPrime(3)).toBe(3);
    expect(findNextPrime(11)).toBe(11);
    expect(findNextPrime(211)).toBe(211);
  });

  it('should return first next prime for non-prime numbers', function () {
    expect(findNextPrime(1)).toBe(2);
    expect(findNextPrime(5)).toBe(5);
    expect(findNextPrime(8)).toBe(11);
    expect(findNextPrime(212)).toBe(223);
  });
});


describe('util.sum', function () {
  it('should return defValue if start is bigger than end', function () {
    expect(sum(mul3, 2, opts)).toBe(14); // end is 2, start is 5
    expect(sum(mul3, 3, opts)).toBe(14);
    expect(sum(mul3, 4, opts)).toBe(14);
  });

  it('should start from 0 if start is not defined', function () {
    expect(sum(mul3, 4, optsNoStart)).toBe(18);
    expect(sum(mul3, 2, optsNoStart)).toBe(3);
  });

  it('should increment by 1 if inc is not defined', function () {
    expect(sum(mul3, 6, optsNoInc)).toBe(15);
    expect(sum(mul3, 7, optsNoInc)).toBe(33);
  });

  it('should sum 0 when function returns falsy value', function () {
    expect(sum(tricky, 8, opts)).toBe(7);
    expect(sum(tricky, 10, opts)).toBe(16);
  });

  it('should return defValue or 0 if final sum is 0', function () {
    expect(sum(undef, 10, opts)).toBe(14);
    expect(sum(nan, 10, opts)).toBe(14);
    expect(sum(zero, 10, opts)).toBe(14);
    expect(sum(zero, 10)).toBe(0);
  });

  it('should sum the values returned by function', function () {
    expect(sum(mul3, 13, opts)).toBe(96);
    expect(sum(mul3, 17, opts)).toBe(180);
    expect(sum(mul3, 37, opts)).toBe(960);
  });
});


describe('util.product', function () {
  it('should return defValue if start is bigger than end', function () {
    expect(product(mul3, 2, opts)).toBe(14); // end is 2, start is 5
    expect(product(mul3, 3, opts)).toBe(14);
    expect(product(mul3, 4, opts)).toBe(14);
  });

  it('should start from 0 if start is not defined', function () {
    expect(product(mul3, 4, optsNoStart)).toBe(162);
    expect(product(mul3, 5, optsNoStart)).toBe(1944);
  });

  it('should increment by 1 if inc is not defined', function () {
    expect(product(mul3, 6, optsNoInc)).toBe(15);
    expect(product(mul3, 7, optsNoInc)).toBe(270);
  });

  it('should multiply by 1 when function returns falsy value', function () {
    expect(product(tricky, 8, opts)).toBe(7);
    expect(product(tricky, 10, opts)).toBe(63);
  });

  it('should return defValue or 1 if final product is 1', function () {
    expect(product(undef, 10, opts)).toBe(14);
    expect(product(nan, 10, opts)).toBe(14);
    expect(product(zero, 10, opts)).toBe(14);
    expect(product(zero, 10)).toBe(1);
  });

  it('should multiply the values returned by function', function () {
    expect(product(mul3, 9, opts)).toBe(315);
    expect(product(mul3, 13, opts)).toBe(280665);
    expect(product(mul3, 17, opts)).toBe(492567075);
  });
});
