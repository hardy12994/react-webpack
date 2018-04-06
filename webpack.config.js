var debug = process.env.NODE_ENV !== "production"; // means development
var webpack = require('webpack');
var path = require('path');

module.exports = {

  context: path.join(__dirname, "src"),
  entry: "./js/client.js",
  mode: "development",
  devtool: debug ? "inline-sourcemap" : false,
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {  
            presets: ['react', 'env', 'stage-0'],
            plugins: [
              'react-html-attrs',
              'transform-decorators-legacy',
              'transform-class-properties'
            ],
          }
        }
      }
    ]
  },
  output: {
    path: __dirname + "/dist/",
    filename: "client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
};