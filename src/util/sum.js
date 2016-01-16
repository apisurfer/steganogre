function sum(func, end, options) {
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
}

module.exports = sum;
