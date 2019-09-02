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

当你的网站需要考虑长效缓存，可以使用不同的 hash

1. 当没有将 css 从 chunk 中抽离时直接使用 chunkhash
2. 当使用 mini-css-extract-plugin 插件抽离 css 时[1],可将 chunk 和 css 块都使用 contenthash 替换达到互不影响的作用
3. 不要使用 hash，这可能因为 webpack 的修改导致 hash 值变动而使缓存失效

关于 hash 的使用场景，可考虑将其作为版本控制；

参考
[Webpack 疑问系列之 hash/chunkhash/contenthash 区别](https://juejin.im/post/5cd5586a5188254459335921)
