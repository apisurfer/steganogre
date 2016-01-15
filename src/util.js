function isPrime(n) {
  var m;

  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
  if (n % 2 == 0) return (n == 2);
  if (n % 3 == 0) return (n == 3);

  m = Math.sqrt(n);

  for (var i = 5;i <= m; i += 6) {
    if (n % i == 0) return false;
    if (n % (i + 2) == 0) return false;
  }

  return true;
}


module.exports = {
  isPrime: isPrime,

  findNextPrime: function(n) {
    while(!isPrime(n++));

    return n - 1;
  },

  sum: function(func, end, options) {
    var sum = 0;
    var current;
    var increment;

    options = options || {};
    current = options.start || 0
    increment = options.inc || 1;

    while (current < end) {
      sum += func(current) || 0;
      current += increment;
    }

    if (sum === 0) {
      sum = options.defValue || sum;
    }

    return sum;
  },

  product: function(func, end, options) {
    var prod = 1;
    var current;
    var increment;

    options = options || {};
    current = options.start || 0;
    increment = options.inc || 1;

    while (current < end) {
      prod *= func(current) || 1;
      current += increment;
    }

    if (prod === 1) {
      prod = options.defValue || prod;
    }

    return prod;
  }
};
