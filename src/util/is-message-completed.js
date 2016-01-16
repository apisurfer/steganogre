function isMessageCompleted(data, i) {
  var done = true;
  var j;

  for(j = 0; j < 16 && done; j++) {
    done = done && (data[i + j * 4] === 255);
  }

  return done;
}

module.exports = isMessageCompleted;
