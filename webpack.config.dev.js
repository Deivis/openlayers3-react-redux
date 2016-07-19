const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: [
    './public/app',
    'webpack-hot-middleware/client'
  ],
  output: {
    path: __dirname,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("bundle.css",{
            allChunks: true
        })
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'public')
    },
    // CSS
    {
       test: /\.css$/,
       include: path.join(__dirname, 'public/styles'),
       loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }
    ]
  }
};
