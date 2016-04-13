var webpack = require('webpack')
var path = require('path')

module.exports = {
  target: 'web',
  cache: 'false',
  entry: {
    main: './src/decode/index',
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'src'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'decode.min.js',
    pathInfo: true,
    library: 'decode',
    libraryTarget: 'var',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules|bower_components/,
        loaders: ['babel?presets[]=es2015,presets[]=stage-2'],
      },
    ],
  },
  debug: true,
}