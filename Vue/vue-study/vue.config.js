const path = require('path')

function resolve(dir) {
  // 获取绝对路径
  return path.join(__dirname, dir)
}

const port = 7080
const title = 'vue项目最佳实践'

module.exports = {
  publicPath: 'best-practice',
  devServer: {
    port
  },
  configureWebpack: {
    name: title
  },
  chainWebpack(config) {
    // svg规则配置，排除icons目录
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    // 新增icons规则，设置svg-sprite-loader
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' }) // 使用图片的名称
      .end()
  }
}
