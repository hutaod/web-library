# webpack 实战

编写一个可维护的 webpack 构建配置

## 构建配置包设计

### 构建配置抽离成 npm 包的意义和注意事项

1. 通用性

- 业务开发者无需关注构建配置
- 统一团队构建脚本

2. 可维护性

- 构建配置合理的拆分
- `README` 文档、`ChangeLog` 文档等

3. 质量
   - 冒烟测试、单元测试、测试覆盖率
   - 持续集成

### 构建配置管理的可选方案

1. 通过多个配置文件管理不同环境的构建，进行 `webpack --config` 参数控制
2. 将构建配置设计成一个库，比如：`hjs-webpack`、`Neutrino`、`webpack-blocks`
3. 抽成一个工具进行管理，比如：`create-react-app`, `kyt`, `nwb`
4. 将所有的配置放在一个文件，通过 `--env` 参数控制分支选择

## 结合 1 和 2 方案管理构建配置

### 通过多个配置文件管理不同环境的 webpack 配置

- 基础配置： `webpack.base.js`
- 开发环境： `webpack.dev.js`
- 生产环境： `webpack.prod.js`
- SSR 环境： `webpack.ssr.js`
- ...

### 抽离成一个 npm 包统一管理

- 规范：`Git commit日志`、`README`、`ESLint 规范`、`Semver 规范(语义化版本号)`
- 质量：冒烟测试、单元测试、测试覆盖率和 CI

### 通过`webpack-merge`组合配置

## 功能模块设计和目录结构
