var fs = require('fs')
var Canvas = require('canvas')
var s = require('./steganogre.min.js')
var canvas = new Canvas(1, 1)
var wraped = s.encode('test message', canvas)
// console.log(wraped.dataURL)
var out = fs.createWriteStream(__dirname + '/test-cli.png')
var stream = canvas.pngStream()

stream.on('data', function(chunk){
  out.write(chunk);
});

stream.on('end', function(){
  console.log('saved png');
});

