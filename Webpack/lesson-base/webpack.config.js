const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  // devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist/')
  },
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8999,
    hot: true, // 开启热更新
    hotOnly: true //尽管html功能没有实现，也不让浏览器刷新
  },
  // 模块配置 主要用来配置不同文件的加载器
  module: {
    // 配置模块规则
    rules: [
      {
        test: /\.(png|jpg|gif|bmp)$/i,
        use: [
          // {
          //   loader: 'file-loader', // 要用到的loader
          //   options: {
          //     // placeholder占位符
          //     name: '[name].[ext]', // 打包后的图片名字，后缀和打包的之前的图片一样
          //     outputPath: 'images/' // 图片打包后的地址
          //   }
          // },
          {
            loader: 'url-loader', // 要用到的loader
            options: {
              // placeholder占位符
              name: '[name].[ext]', // 打包后的图片名字，后缀和打包的之前的图片一样
              outputPath: 'images/', // 图片打包后的地址
              limit: 8192
            }
          }
        ]
      },
      {
        test: /.css$/,
        // loader的执行顺序是从右向左，从下到上。css-loader：分析几个css文件之间的关系，最终合并为一个css。style-loader:在得到css生成的内容时，把其挂载到html的head里，成为内联样式。
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.less$/,
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
        ]
      },
      {
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 不需要对第三方模块进行转换，耗费性能
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html' // 以index.html为模板，把打包生成的js自动引入到这个html文件中
    }),
    new CleanWebpackPlugin(), // 在打包之前，可以删除dist文件夹下的所有内容
    new webpack.HotModuleReplacementPlugin() // 使用模块热更新插件
  ]
};
