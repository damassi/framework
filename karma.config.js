const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const config = require('ape-config')

var testBrowsers = [
  'Chrome'
]

if (config.env !== 'dev') {
  testBrowsers = ['jsdom']
}

module.exports = function(config) {

  config.set({
    browsers: testBrowsers,

    frameworks: [
      'mocha',
      'sinon'
    ],

    reporters: [
      'spec',
      'beep'
    ],

    files: [
      { pattern: 'karma.webpack.tests.js', watched: true }
    ],

    preprocessors: {
      'karma.webpack.tests.js': [
        'webpack',
        'sourcemap'
      ]
    },

    webpack: {
      devtool: 'inline-source-map',

      resolve: {
        extensions: ['', '.js', '.jsx'],
        root: [
          path.resolve('./src'),
        ],
        modulesDirectories: [
          'node_modules'
        ]
      },

      plugins: [
        new webpack.DefinePlugin({
          '__DEV__': true,
          '__TEST__': true
        }),
        new WebpackNotifierPlugin(),
      ],

      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              plugins: ['transform-decorators-legacy' ],
              presets: [
                'es2015',
                'react',
                'stage-0'
              ]
            }
          }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }
  })
}
