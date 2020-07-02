const fs = require('fs')
const path = require('path')

const files = fs.readdirSync('./i18n')

const data = files.reduce((res, file) => {
  const content = require(path.resolve(__dirname, 'i18n', file))
  res = { ...res, ...content }
  return res
}, {})

// console.log(files)
// console.log(data)
try {
  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2))
} catch (error) {
  console.log('写入失败', error)
}
