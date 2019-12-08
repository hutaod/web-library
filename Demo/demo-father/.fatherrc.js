// 文档参考 https://github.com/umijs/father
export default {
  entry: 'src/index.js',
  // esm: {
  //   type: 'rollup',
  //   mjs: true
  // }, // 指定格式 有rollup和babel
  esm: 'babel',
  cjs: 'babel',
  umd: {
    name: 'foo', // 指定name
    minFile: false, // 不生成压缩文件
    globals: {
      react: 'React'
    }
  }
}
