// import { Configuration } from 'webpack'
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const RemoveCommentsPlugin = require('./remove-comments-plugin')

/**
 * @type {Configuration} 技巧，用于智能提示webpack语法
 */
const config = {
  entry: './src/index.js', // 注意这里的`./`不能省略掉
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  mode: 'production', // 如果CLI 有--mode参数传入 以--mode参数为准
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.md$/,
        use: ['html-loader', './markdown-loader'], // 写法和require类似，可以用package名称也可以用相对路径
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'About',
      filename: 'about.html',
    }),
    new CopyWebpackPlugin(['public']),
    new RemoveCommentsPlugin(),
  ],
}

module.exports = config
