var fs = require('fs')
var path = require('path')
var Canvas = require('canvas')
var minimist = require('minimist')
var encodeString = require('./steganogre.min.js').encodeString

var args = minimist(process.argv.slice(2))
var msg = args.m
var first = args._[0]
var second = args._[1]

if (!msg && (!first || !second)) {
  console.log('Incorrect parameters passed!')

  return
}

if (msg) {
  if (!first) {
    console.error('You need to specify output name!')

    return
  }

  writeMsgToFile(msg, first)
} else {
  if (!first || !second) {
    console.error('You must provide input and output filename!')

    return
  }

  var content = fs.readFileSync(first, { encoding: 'utf8' })

  writeMsgToFile(content, second)
}

function writeMsgToFile(msg, filename) {
  var canvas = new Canvas(1, 1)
  var wraped = encodeString(msg, canvas)
  var out = fs.createWriteStream(path.join(__dirname + '/' + filename))
  var stream = canvas.pngStream()

  stream.on('data', function(chunk){
    out.write(chunk);
  });

  stream.on('end', function(){
    console.log('msg encoded to ' + filename);
  });
}
