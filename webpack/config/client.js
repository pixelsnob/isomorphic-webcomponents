
'use strict';

var webpack           = require('webpack'),
    path              = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var app_dir = path.resolve(__dirname, '../../');

module.exports = {
  context: app_dir,
  entry: { 
    client: [
      './client/app'
    ]
  },
  output: {
     path: path.join(app_dir, 'public/dist'),
     publicPath: '/dist/',
     filename: '[name].js'
  },
  resolve: {
    extensions: [ '', '.js' ],
    root: [
      path.join(app_dir, 'client'),
      path.join(app_dir, 'node_modules')
    ],
    alias: {
    }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.ProvidePlugin({
    })
  ],
  eslint: {
    failOnWarning: false,
    failOnError: true
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      { 
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: [ 'es2015', 'stage-0' ],
          plugins: [ 'transform-remove-strict-mode' ]
        }
      },
      { 
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'style-loader', 
          'css-loader?sourceMap!less-loader'
        )
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader', 
          'css-loader?sourceMap'
        )
      },
      {
        test: /bootstrap\/js\//,
        loader: 'null-loader'
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=1000000'
      }
    ]
  }
};


