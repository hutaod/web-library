const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const __DEV__ = NODE_ENV === 'development'
console.log(__DEV__)

module.exports = {
  mode: __DEV__ ? 'development' : 'production',
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8090,
    // open: true,
    contentBase: '../dist',
    hot: true,
    // hotOnly: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9092'
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '首页',
      template: './public/index.html',
      filename: 'index.html'
    }),
    // 以下两个用于热模块替换
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__
    })
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
}
