<h1 align="center">React Lib Design</h1>

<div align="center">

复制Antd

</div>

## ✨ 特性

- 🌈 提炼自企业级中后台产品的交互语言和视觉风格。
- 📦 开箱即用的高质量 React 组件。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- ⚙️ 全链路开发和设计工具体系。
- 🌍 数十个国际化语言支持。
- 🎨 深入每个细节的主题定制能力。

## 🖥 兼容环境

- 现代浏览器和 IE11（需要 [polyfills](https://ant.design/docs/react/getting-started-cn#兼容性)）。
- 支持服务端渲染。
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 📦 安装

```bash
npm install antd --save
```

```bash
yarn add antd
```

## 🔨 示例

```jsx
import { Button, DatePicker } from 'antd';

const App = () => (
  <>
    <Button type="primary">PRESS ME</Button>
    <DatePicker />
  </>
);
```

引入样式：

```jsx
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
```

### 🌈 定制主题

参考 [定制主题](https://ant.design/docs/react/customize-theme-cn) 文档。

### 🛡 TypeScript

参考 [在 TypeScript 中使用](https://ant.design/docs/react/use-in-typescript-cn)。

## 🌍 国际化

参考 [国际化文档](https://ant.design/docs/react/i18n-cn)。

## 🔗 链接

- [首页](https://ant.design/)
- [所有组件](https://ant.design/components/overview-cn)
- [Ant Design Pro](http://pro.ant.design/)
- [更新日志](CHANGELOG.en-US.md)
- [React 底层基础组件](http://react-component.github.io/)
- [移动端组件](http://mobile.ant.design)
- [页面级组件](https://procomponents.ant.design)
- [Ant Design 图表](https://charts.ant.design)
- [Ant Design 图标](https://github.com/ant-design/ant-design-icons)
- [Ant Design 色彩](https://github.com/ant-design/ant-design-colors)
- [首页模板集](https://landing.ant.design)
- [动效](https://motion.ant.design)
- [脚手架市场](http://scaffold.ant.design)
- [设计规范速查手册](https://github.com/ant-design/ant-design/wiki/Ant-Design-%E8%AE%BE%E8%AE%A1%E5%9F%BA%E7%A1%80%E7%AE%80%E7%89%88)
- [开发者说明](https://github.com/ant-design/ant-design/wiki/Development)
- [版本发布规则](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [常见问题](https://ant.design/docs/react/faq-cn)
- [CodeSandbox 模板](https://u.ant.design/codesandbox-repro) for bug reports
- [定制主题](https://ant.design/docs/react/customize-theme-cn)
- [国际化](https://ant.design/docs/react/i18n-cn)
- [成为社区协作成员](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator)

## ⌨️ 本地开发

你可以使用 Gitpod 进行在线开发：

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design)

或者克隆到本地开发:

```bash
$ git clone git@github.com:ant-design/ant-design.git
$ cd ant-design
$ npm install
$ npm start
```

打开浏览器访问 http://127.0.0.1:8001 ，更多[本地开发文档](https://github.com/ant-design/ant-design/wiki/Development)。

## 🤝 参与共建 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

请参考[贡献指南](https://ant.design/docs/react/contributing-cn).

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

[![Let's fund issues in this repository](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/34526884)
