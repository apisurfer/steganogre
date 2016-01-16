function product(func, end, options) {
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

module.exports = product;
