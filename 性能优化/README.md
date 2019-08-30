# 性能优化

## 首屏加载

### 白屏处理（loading）

### 开启 http2

### 浏览器缓存 利用浏览器缓存机制，拆分第三方库

## TTI（可交互时间）

在页面基本呈现到可以交互这段时间,绝大部分的性能消耗都在 JavaScript 的解释和执行上，这个时候决定 JavaScript 解析速度的无非一下两点:

1. Javascript 脚本体积 - 通过压缩、去除无引用代码（rollup，webpack4+）
2. Javascript 本身执行速度
3. polyfill 动态加载 - 解决这个问题的方法很简单,直接引入 <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script> 即可
4. 动态加载 ES6 代码 [参考链接](https://juejin.im/entry/5a0111e76fb9a0451f305761)
