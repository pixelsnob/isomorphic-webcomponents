
'use strict';

const webpack           = require('webpack'),
      path              = require('path'),
      nodeExternals     = require('webpack-node-externals');

const app_dir = path.join(__dirname, '../../');

module.exports = {
  context: app_dir,
  externals: [ nodeExternals() ],
  target: 'node',
  entry: './server/app.js',
  devtool: 'source-map',
  output: {
     path: path.join(app_dir, 'server/dist'),
     filename: 'app.js'
  },
  plugins: [
  ],
  resolve: {
    extensions: [ '', '.js' ],
    root: [
      path.join(app_dir, 'server'),
      path.join(app_dir, 'public'),
      path.join(app_dir, 'node_modules')
    ],
    alias: {
    }
  },
  eslint: {
    failOnWarning: false,
    failOnError: true
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules|test/ }
    ],
    loaders: [
      { 
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: [ 'es2015', 'stage-0' ]
        }
      },
      { 
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: 'null-loader'
      }
    ]
  }
};

