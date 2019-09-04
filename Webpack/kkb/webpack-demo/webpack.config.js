const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // entry: './src/index.js',
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
    // 必须时绝对路径
    path: path.resolve(__dirname, './dist'),
    // js模块，用 chunkhash css变化后js变化
    // 如果使用 contenthash css变化后js无变化 js变化css无变化 用于css抽离时
    // 所以当使用mini-css-extract-plugin插件抽离css时，可将chunk和css块都使用contenthash替换达到互不影响的作用
    filename: '[name]_[chunkhash:8].js'
    // filename: '[name].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|gif|jpe?g)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            // 打包后放的位置
            outputPath: 'images/',
            limit: 2048
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff2|woff)$/,
        use: {
          loader: 'file-loader'
        }
      },
      // {
      //   test: /\.(less)$/,
      //   use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
      // }
      {
        test: /\.(less)$/,
        exclude: /\.(module.less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          'less-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(module.less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'less-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      title: '首页',
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: '注册',
      template: './src/index.html',
      inject: true,
      chunks: ['login'],
      filename: 'login.html'
    })
  ]
  // watch: true, // 默认false
  // watchOptions: {
  //   // 忽略node_modules的变化
  //   ignored: /node_modules/,
  //   // 监听到文件变化后，等300ms再去执行，默认300ms
  //   aggregateTimeout: 300,
  //   // 判断文件是否发生变化时通过不停的询问系统指定文件有没有变化，默认每秒1次询问
  //   poll: 1000 // 单位ms
  // },
}
