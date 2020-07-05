const fs = require('fs')
const path = require('path')

// 获取文件目录
const jsonPath = process.argv[2]

if (!jsonPath) {
  console.log('没有传 JSON 目录参数哦！')
  process.exit(1)
}

const rootPath = path.join(process.cwd(), jsonPath)

// 方式一
function mergeFileData(dirPath) {
  const files = fs.readdirSync(dirPath)

  const data = files.reduce((res, file) => {
    if (/\.json$/.test(file)) {
      try {
        const content = require(path.resolve(__dirname, 'i18n', file))
        res = { ...res, ...content }
      } catch (err) {
        console.log('err', err)
      }
    }
    return res
  }, {})

  // console.log(files)
  // console.log(data)
  try {
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2))
  } catch (error) {
    console.log('写入失败', error)
  }
}

// 方式二
// 判断目标路径的文件存在与否
const exists = filePath => fs.existsSync(filePath)
// 遍历所有文件，返回目录下的所有json文件地址的数组
const walkJson = path => {
  return fs.readdirSync(path).reduce((files, file) => {
    const filePath = path + '/' + file
    const stat = fs.statSync(filePath)
    // 确保是文件且是json文件
    if (stat.isFile() && /(.*)\.(json)$/.test(file)) {
      return files.concat(filePath)
    }
    return files
  }, [])
}

function mergeFileData(dirPath) {
  // 获取json文件地址列表
  const files = walkJson(dirPath)

  if (!files.length) {
    process.exit(2)
  }
  // filter这一步感觉没啥必要，walkJson中已经判断了
  const data = files.filter(exists).reduce((total, file) => {
    const fileData = fs.readFileSync(file)
    const basename = path.basename(file, '.json')
    let fileJson
    try {
      fileJson = JSON.parse(fileData)
    } catch (err) {
      console.log('读出出错', file)
      console.log(err)
    }

    total[basename] = fileJson
    return total
  }, {})

  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2))
}

mergeFileData(rootPath)
