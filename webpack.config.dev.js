const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    './src/client/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': true,
      '__TEST__': false
    }),
    new WebpackNotifierPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
        query: {
          plugins: [
            'transform-decorators-legacy'
          ],
          presets: [
            'es2015',
            'react',
            'react-hmre',
            'stage-0'
          ]
        }
      },

      // Precompile npm modules written in ES6. Wild west out here right now
      // See: https://github.com/webpack/webpack/issues/1670
      {
        test: /node_modules\/(qs)\/.*\.js$/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
          ],
        }
      },
    ]
  }
}
