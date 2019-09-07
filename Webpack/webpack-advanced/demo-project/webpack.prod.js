const glob = require('glob')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const merge = require('webpack-merge')
// const webpack = require('webpack')
// const baseConfig = require('./webpack.base')

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
  // console.log(entryFiles)
  Object.keys(entryFiles).map(index => {
    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/(.*)\/index\.js$/)
    const pageName = match[1]
    entry[pageName] = entryFile
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        title: pageName,
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['venders', 'commons', pageName],
        inject: true,
        // 压缩参数配置
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
        }
      })
    )
  })

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA()
// console.log(htmlWebpackPlugins[0])

const prodConfig = {
  entry,
  output: {
    filename: '[name]_[contenthash:8].js'
  },
  mode: 'production',
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecesion: 8
            }
          }
        ]
      },
      {
        test: /.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              limit: 1024
            }
          }
        ]
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: require('cssnano')
    }),
    ...htmlWebpackPlugins,
    // 构建异常和中断处理
    function() {
      // webpack3
      // this.plugin("done", stats => {
      //   if(stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
      //     console.log('build error'),
      //     process.exit(1);
      //   }
      // })

      // webpack4
      this.hooks.done.tap("done", stats => {
        if(stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log('build error'),
          process.exit(1);
        }
      })
    }
    // new webpack.optimize.ModuleConcatenationPlugin() // production 默认开启
  ],
  optimization: {
    // usedExports: true, // 启用TerserPlugin 在生产环境默认启用（tree shaking）
    splitChunks: {
      // chunks: 'all', // 对同步 initial，异步 async，所有的模块 有效 all
      minSize: 30, // 单位b 文件大小超过设定值时才会进行分割
      // maxSize: 0, // 对模块进行二次分割，不推荐使用
      // minChunks: 1, // 打包生成的chunk文件最少有⼏个chunk引用了这个模块 默认1
      // maxAsyncRequests: 5, // 最⼤异步请求数，默认5 
      // maxInitialRequests: 3, // 最⼤大初始化请求书，⼊入⼝口⽂文件同步请求，默认3
      // automaticNameDelimiter: '~', // 打包分割符号 默认是~
      // name: true,// 打包后的名称，除了了布尔值，还可以接收⼀一个函数function 
      // 不设置缓存组会把所有的都打包在一起
      cacheGroups: { // 缓存组
        thrids: {
          test: /(react|react-dom)/,
          name: 'venders',
          chunks: 'all',
          // priority: -10 // 缓存组优先级 数字越⼤大，优先级越⾼高
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },
  stats: 'errors-only' // 
}

module.exports = prodConfig
// module.exports = merge(baseConfig, prodConfig)
