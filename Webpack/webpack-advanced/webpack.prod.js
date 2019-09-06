const glob = require('glob')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')
// const webpack = require('webpack')
const baseConfig = require('./webpack.base')

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
    ...htmlWebpackPlugins
    // new webpack.optimize.ModuleConcatenationPlugin()
  ],
  optimization: {
    splitChunks: {
      minSize: 10, //单位b 文件大小超过设定值时才会进行分割
      cacheGroups: {
        thrids: {
          test: /(react|react-dom)/,
          name: 'venders',
          chunks: 'all'
        },
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
}

module.exports = merge(baseConfig, prodConfig)
