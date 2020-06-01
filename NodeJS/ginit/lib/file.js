const fs = require("fs")
const path = require("path")

module.exports = {
  // 获取目录名称
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd())
  },
  // 判断目录是否存在
  directoryExists: filePath => {
    return fs.existsSync(filePath)
  }
}