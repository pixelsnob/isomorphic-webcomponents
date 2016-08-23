
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
    /*new webpack.ProvidePlugin({
      Backbone:       'backbone'
    })*/
  ],
  resolve: {
    extensions: [ '', '.js' ],
    root: [
      path.join(app_dir, 'shared'),
      path.join(app_dir, 'public/js'),
      path.join(app_dir, 'node_modules')
    ],
    alias: {
      template:                  'lib/template',
      vex_dialog:                'vex-js/js/vex.dialog',
      markdown:                  'marked',
      webcomponents:             'webcomponents.js/webcomponents'  
    }
  },
  module: {
    loaders: [
      { 
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: [ 'react', 'es2015', 'stage-0' ]
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

