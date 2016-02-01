const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: [
    './src/client/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
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
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),

    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.DefinePlugin({
      '__DEV__': false,
      '__TEST__': false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new HtmlWebpackPlugin({
      template: 'src/shared/templates/prod-index.html'
    })
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
            'stage-0'
          ],
        }
      },

      // Precompile problematic NPM modules for JSLint minification
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
