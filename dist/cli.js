var fs = require('fs')
var Canvas = require('canvas')
var minimist = require('minimist')
var encode = require('./steganogre.min.js').encode

var canvas = new Canvas(1, 1)
var args = minimist(process.argv.slice(2))
var msg = args._[0]
var filename = args._[1]

if (!msg || !filename) {
  console.error('You must provide message and filename parameters')

  return
}

var wraped = encode(msg, canvas)
var out = fs.createWriteStream(__dirname + '/' + filename)
var stream = canvas.pngStream()

stream.on('data', function(chunk){
  out.write(chunk);
});

stream.on('end', function(){
  console.log('msg encoded to ' + filename);
});

