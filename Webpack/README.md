# 掌握Webpack
Webpack是现在前端必须掌握的技能之一，也是前端进阶一大难点，学习目标：掌握Webpack
的配置，理解Webpack的作用与原理，拥有工程化的前端思维，轻松构建项目

### 1.1 什么是Webpack
Webpack 是一个现代JavaScript应用程序的静态模块打包工具，作用： 分析项目结构，递归地构建一个依赖关系图，包含应用需要的每个模块，然后将这些模块打包成一个或多个bundle

**webpack构建：**
  
    构建就是把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码，包括如下内容。

1.代码转换： TypeScript 编译成 JavaScript、SCSS或Less 编译成 CSS 等
2.文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
3.代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
4.模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
5.自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器,nodemon。
6.代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过
7.自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。 构建给前端开发注入了更大的活力，解放了我们的生产力,更加方便了我们的开发。

1.2 什么是 webpack 模块
* [ES2015](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) `import` 语句
* [CommonJs](http://www.commonjs.org/specs/modules/1.0/) `require()` 语句
* [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) `define` 和 `require` 语句
* css/sass/less 文件中的 `@import` 语句
* 样式(`url(...)`)或HTML文件 (`<img src=...`)中的图片链接

**详细请看官网文档**: [Modules MODULES](https://webpack.js.org/api/module-methods)