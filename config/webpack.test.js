const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './test/client/testBrowser.js',
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules', 'src/client']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [/node_modules/, /framework/],
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
              ignore: false
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /framework/],
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        IN_BROWSER: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './test/client/template/index.html',
      filename: './index.html'
    })
  ],
  node: {
    fs: 'empty'
  }
};
