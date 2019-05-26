const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    // filename: '[name].js',
    // // main.js异步加载的间接的js文件。用来打包import('module')方法中引入的模块
    // chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 10240
          }
        }
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery', //发现模块中有$字符串，就自动引入iquery,就可以用jquery
      _join: ['lodash', 'join'] //_join代表lodash里的join方法
    })
  ],
  optimization: {
    runtimeChunk: {
      //兼容老版本webpack4，把manifest打包到runtime里，不影响业务代码和第三方模块
      name: 'runtime'
    },
    usedExports: true,
    splitChunks: {
      // 启动代码分割，有默认配置项
      chunks: 'all'
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10,
      //     name: 'vendors'
      //   }
      // }
    }
  }
};
