const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const commenConfig = require('./webpack.common');
const WorkboxPlugin = require('workbox-webpack-plugin')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  module: {
    rules: [{
        test: /\.less/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
              modules: true
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        // loader的执行顺序是从右向左，从下到上。css-loader：分析几个css文件之间的关系，最终合并为一个css。style-loader:在得到css生成的内容时，把其挂载到html的head里，成为内联样式。
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }
    ]
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', //直接引用的css文件
      chunkFilename: '[name].chunk.css' //间接引用的css文件
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};
//将线上配置和公共配置做结合
module.exports = merge(commenConfig, prodConfig);