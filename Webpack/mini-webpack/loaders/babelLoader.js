const babel = require('@babel/core')
const fs = require('fs')
let i=1

module.exports = function BabelLoader (source) {
  const res = babel.transform(source, {
    sourceType: 'module' // 允许使用import和export语法
  })
  if (i > 0) {
    fs.writeFileSync('./test.js', res.code)
  }
  i--
  return res.code
}