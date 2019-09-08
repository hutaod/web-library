const cssnano = require('cssnano');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader',
      },
      {
        test: /\.less$/,
        use: 'ignore-loader',
      },
    ],
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0, // 单位b 文件大小超过设定值时才会进行分割
      cacheGroups: {
        // 缓存组
        commons: {
          test: /(react|react-dom)/,
          name: 'venders',
          chunks: 'all',
          // priority: 1 // 缓存组优先级 数字越⼤大，优先级越⾼高
        },
        others: {
          name: 'others',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
