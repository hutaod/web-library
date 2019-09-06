// 找到入口文件，分析内容，有依赖的话，拿到依赖路径，转换代码（浏览器中可运行的）
const path = require('path')
const fs = require('fs')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAstSync } = require('@babel/core')
const webpackConfig = require('./webpack.config')

// 1.找入口文件，分析内容，有依赖的话，拿到依赖路径
const entry = entryFile => {
  const content = fs.readFileSync(entryFile, 'utf-8')
  // console.log(content)
  const ast = parser.parse(content, {
    sourceType: 'module'
  })

  const dependecies = {}

  traverse(ast, {
    // 以函数方式定义
    ImportDeclaration({ node }) {
      const dirname = path.dirname(entryFile)
      // console.log(dirname)
      const newPath = './' + path.join(dirname, node.source.value)
      // console.log(newPath)
      dependecies[node.source.value] = newPath
      // console.log(node.source)
    }
  })
  // console.log(dependecies)
  const { code } = transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env']
  })

  return {
    entryFile,
    dependecies,
    code
  }

  // console.log(ast.program.body)
}

// 2. 递归获取所有依赖的对象
const Dependecies = entryFile => {
  const info = entry(entryFile)
  // console.log(info)

  const modules = []
  modules.push(info)

  // 循环递归方式
  for (let index = 0; index < modules.length; index++) {
    const item = modules[index]
    const { dependecies } = item
    // console.log(item)
    if (dependecies) {
      for (const key in dependecies) {
        modules.push(entry(dependecies[key]))
      }
    }
  }

  const obj = {}
  modules.forEach(item => {
    obj[item.entryFile] = {
      dependecies: item.dependecies,
      code: item.code
    }
  })
  // console.log(obj)
  return obj
}

// 3. 生成代码
const genCode = entryFile => {
  const obj = Dependecies(entryFile)
  // console.log(obj)
  const graph = JSON.stringify(obj)
  const bundle = `(function(graph){
    function require(module) {
      function localrequire(relativePath) {
        return require(graph[module].dependecies[relativePath])
      }
      var exports = {};
      (function(require, exports, code) {
        eval(code)
      })(localrequire, exports, graph[module].code);
      return exports
    }
    require('${entryFile}')
  })(${graph})`

  fs.writeFileSync(path.resolve(__dirname, './dist/main.js'), bundle, 'utf-8')
}

// 入口
genCode(webpackConfig.entry)
