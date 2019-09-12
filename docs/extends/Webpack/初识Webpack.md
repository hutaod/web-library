
# 初识 webpack

## 为什么需要构建工具

1. 转换 `ES6` 语法
2. 转换 `JSX`
3. `CSS` 前缀补全/预处理器
4. 压缩混淆
5. 图片压缩

## 1.1 为什么选择 Webpack？

- 社区生态丰富
- 配置灵活和插件化
- 官方更新迭代速度快

## 初识 Webpack：配置文件名称

- webpack 默认配置文件是 webpack.config.js
- 可以通过 webpack --config 指定配置文件

## 初识 Webpack：配置组成

```javascript
module.exports = {
  // 打包入口文件
  entry: './src/index.js',
  // 打包输出文件
  output: './dist/main.js',
  // 环境
  mode: 'production',
  //
  module: {
    // Loader配置
    rules: [{ test: /\.txt$/, use: 'raw-loader' }]
  },
  // 插件配置
  plugins: [
    new HtmlwebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```

## 零配置的 webpack 包含哪些内容

```javascript
module.exports = {
  entry: './src/index.js', // 指定默认入口文件
  output: './dist/main.js', // 指定默认输出文件
  mode: 'production' // 默认环境为 production
}
```
