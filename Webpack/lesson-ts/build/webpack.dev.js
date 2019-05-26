const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commenConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8999,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.module\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
              modules: true
            }
          },
          'postcss-loader',
          'less-loader'
        ],
        exclude: [path.resolve(__dirname, '..', 'node_modules')]
      },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      //   exclude: [path.resolve(__dirname, '..', 'node_modules')]
      // },
      {
        test: /\.css$/,
        // loader的执行顺序是从右向左，从下到上。css-loader：分析几个css文件之间的关系，最终合并为一个css。style-loader:在得到css生成的内容时，把其挂载到html的head里，成为内联样式。
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],

  optimization: {
    usedExports: true
  }
};
//将开发配置和公共配置做结合
module.exports = merge(commenConfig, devConfig);
