const {
  override,
  fixBabelImports,
  addDecoratorsLegacy
} = require('customize-cra')

// override生成webpack配置对象
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  addDecoratorsLegacy()
)
