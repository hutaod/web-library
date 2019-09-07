const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    'large-number': './src/index.js',
    'large-number.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    library: 'largeNumber',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  mode: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      // uglify-webpack-plugin 压缩的时候遇到es6语法会报错
      // 设置mode为production时默认是使用 terser-webpack-plugin 插件，也是基于uglify-js3改造的
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  }
}
