const webpack = require('./webpack/src/index')

const config = require('./webpack.config.js')


webpack(config, function (err, stats) {
  if (err || stats.hasError()) {
    console.log('编译出错惹')
  }
})