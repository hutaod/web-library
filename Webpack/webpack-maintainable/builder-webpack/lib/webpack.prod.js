const cssnano = require('cssnano');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const prodConfig = {
  output: {
    filename: '[name]_[contenthash:8].js',
  },
  mode: 'production',
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/,
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
