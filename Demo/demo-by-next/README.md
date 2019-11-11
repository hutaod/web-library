# Nextjs 学习

## Next做了哪些事

- 自动打包编译 (使用 webpack 和 babel)
- 热加载
- 以 ./pages作为服务的渲染和索引
- 静态文件服务. ./static/ 映射到 /static/ (可以 创建一个静态目录 在你的项目中)

### 代码自动分割

每个页面只会导入import中绑定以及被用到的代码. 这意味着页面不会加载不必要的代码

### getInitialProps 入参对象

- pathname - URL 的 path 部分
- query - URL 的 query 部分，并被解析成对象
- asPath - 显示在浏览器中的实际路径（包含查询部分），为String类型
- req - HTTP 请求对象 (仅限服务器端)
- res - HTTP 返回对象 (仅限服务器端)
- jsonPageRes - 获取响应对象（仅限客户端）
- err - 渲染过程中的任何错误

## 常见问题或处理方式

- 运行 npm run dev -- -p port 在其他端口运行