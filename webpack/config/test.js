
'use strict';

const webpack = require('webpack'),
  path = require('path'),
  nodeExternals = require('webpack-node-externals');

const app_dir = path.resolve(__dirname, '../../');

module.exports = {
  target: 'node',
  externals: [ nodeExternals() ],
  devtool: 'cheap-module-source-map',
  module: {
    preLoaders: [
    ],
    loaders: [
      { 
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: [ 'es2015', 'stage-0' ],
          plugins: [ 'transform-remove-strict-mode' ]
        }
      }
    ]
  }
};


