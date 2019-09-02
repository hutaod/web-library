# webpack 学习

webpack 是一个模块打包器，早期只是 js 打包工具

## 查看 webpack 版本

```bash
npx webpack -v
./node_modules/.bin/webpack -v
# 查看webpack信息
npm info webpack
```

## 文件指纹

作用：缓存

`hash` webpack 构建的 hash 版本 构建一次变一次
`chunkhash` 根据文件 chunk 生成的，只针对入口文件，入口文件变化内容变才会变
`contenthash` 用于 比如 css 文件中，当引入的 css 文件的主文件变化，css 未变化就不需要改变，如果 css 不使用 contenthash，那么 indexjs 变了之后 index.less 也会变
