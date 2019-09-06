'use strict'

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry:
    //         'https://cdn.bootcss.com/react/16.9.0-rc.0/umd/react.production.min.js',
    //       global: 'React'
    //     },
    //     {
    //       module: 'react-dom',
    //       entry:
    //         'https://cdn.bootcss.com/react-dom/16.9.0-alpha.0/umd/react-dom.production.min.js',
    //       global: 'ReactDOM'
    //     }
    //   ]
    // })
  ]
}
