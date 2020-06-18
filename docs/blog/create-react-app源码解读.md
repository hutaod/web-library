# create-react-app 源码解读

`create-react-app` 是 react 官方的脚手架（后面简写 cra），也是 react 主要开发人员 Dan Abramov 大神写的。如果你想自己打造一个通用的脚手架，可以参考下 cra 的源码，下面会主要以部分原理加代码注释来解读 cra 的源码。

## 模块划分

cra 拆分成了 11 个包，下面简单介绍一些核心的包的作用。

- `create-react-app`： 脚手架工具，也就是 cli 的核心代码
- `react-scripts`： npm scripts 命令工具，主要封装了开发/打包/测试/暴露自身核心代码功能。
- `react-dev-utils`：主要提供给`react-scripts`包使用的一些工具类方法
- `cra-template`：cra 创建的 react js 项目模板代码
- `cra-template-typescript`：cra 创建的 react ts 项目模板代码
- `eslint-config-react-app`：eslint 规则配置
- `babel-preset-react-app`：babel 配置
- ......

其实主要核心在`create-react-app`和`react-scripts`这两个包里面，后面就主要着重介绍它俩的实现。其他模块也会在后续慢慢更新。

## create-react-app

该包提供了一个 cli —— `create-react-app`，用于生成一个 react 项目。

先看一下`package.json`，一般而言，看一个包或者一个项目先看`package.json`：

```json
// 只列出来了一些核心配置
{
  "name": "create-react-app", // 包名，用于npm识别
  "engines": {
    "node": ">=10" // 说明node版本兼容性
  },
  // npm 发布时保留的文件
  "files": ["index.js", "createReactApp.js", "yarn.lock.cached"],
  // 命令行
  "bin": {
    "create-react-app": "./index.js"
  }
}
```

当使用 `npx create-react-app` 进行初始化项目的时候，会默认使用 bin 中的第一条命令。

cli 提供了一些命令行参数。
