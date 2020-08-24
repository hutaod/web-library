# commit规范及自动生成changelog

## 前言

不规范的commit很可能一个月之后你自己也不记得当时提交代码的目的了，而规范的commit可以更好的定位问题，所以，为了能使得日后复（zhao）盘（guo）和找bug的时候更加的方便，团队之间遵守同一套 commit message 规范还是很有必要的。本文主要介绍目前使用最广的commit规范，比较合理和系统化，并且有配套的工具。

# commit message 作用

* 提供更多的历史信息，方便快速浏览。
* 可以过滤某些commit（比如文档改动），便于快速查找信息。
* 可以直接从commit生成Change log。

# commit message 格式说明

commit message 主要包含三部分： `Header` ， `Body`  和  `Footer`

``` javascript
< type > ( < scope > ): < subject >
    // 空一行
    <
    body >
    // 空一行
    <
    footer >
```

其中， `Header`  是必填， `Body`  和  `Footer`  是选填。

### Header

`Header`  包括三个字段： `type` （必填）、 `scope` （选填）和  `subject` （必填）'

#### type

`type` 用于说明 `commit` 的类别，一下是常用的8个标识：

* **feat**: 一个新特性
* **fix**: 修了一个 Bug
* **docs**: 更新了文档（比如改了 Readme）
* **style**: 代码的样式美化，不涉及到功能修改（比如改了缩进）
* **refactor**: 一些代码结构上优化，既不是新特性也不是修 Bug（比如函数改个名字）
* **perf**: 优化了性能的代码改动
* **test**: 新增或者修改已有的测试代码
* **chore**: 跟仓库主要业务无关的构建/工程依赖/工具等功能改动（比如新增一个文档生成工具）

`type` 为 `feat` 和 `fix` ，则该 `commit` 将肯定出现在 `Change log` 之中。

#### scope

`scope`  用于说明  `commit`  影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

#### subject

`subject`  是  `commit`  目的的简短描述，不超过54个字符

``` 
以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
第一个字母小写
结尾不加句号（.）
```

### body

`Body`  部分是对本次  `commit`  的详细描述，可以分成多行。直接用git-cz命令输入不能换行(也许是我没找到换行的方法😂)

### Footer

`Footer`  部分只用于两种情况

* 不兼容变动

如果当前代码与上一个版本不兼容，则 `Footer` 部分以 `BREAKING CHANGE` 开头，后面是对变动的描述、以及变动理由和迁移方法。

* 关闭 `Issue` 如果当前 `commit` 针对某个 `issue` ，那么可以在 `Footer` 部分关闭这个 `issue`

``` 
Closes #123, #245, #992
```

## 安装和使用

上面主要描述了commit规范的作用和格式说明，下面会从0开始给项目添加commit规范和lint检查工具

### 安装git-cz

#### 全局安装

安装后直接用git cz替换git commit

``` bash
npm install -g git-cz
```

#### 局部安装

安装git-cz和commitizen

``` bash
# 安装commitizen 用于初始化commit的规范
npm install -g commitizen
npm install --save-dev git-cz
# 使用cz-conventional-changelog 规范(默认定义好了一系列规则)
commitizen init cz-conventional-changelog --save-dev --save-exact
```

执行上面安装完成后package.json中会自动添加以下内容

``` json
{
  "devDependencies": {
  	// ...
    "cz-conventional-changelog": "^3.2.0",
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

执行 `npx git-cz` 或者添加一下npm scripts再执行 `npm run commit`

``` json
"scripts": {
    "commit": "git-cz"
},
```

执行后可选择commit类型

![image.png](https://cdn.nlark.com/yuque/0/2020/png/93172/1597981891362-2b4f38ba-a1c2-4f09-af1b-de4f07f9ca70.png#align=left&display=inline&height=360&margin=%5Bobject%20Object%5D&name=image.png&originHeight=360&originWidth=1324&size=69062&status=done&style=none&width=1324)

选择type后回车，就会让你填写scope，这个一般可以不写，直接跳过，或者自定义配置项时过滤掉该步奏下一步就是填写body的内容和后续footer的内容，都可以跳过，但如果一次性提交内容过多，建议填写详细的描述到body，footer一般情况很少用到，对应情况填写。body试了很多次，命令行中无法换行，如果大家发现换行的方式，欢迎指正，谢谢！这里也可以用git工具进行填写commit message

自定义配置，新增changelog.config.js

``` javascript
// changelog配置，commit 规则也在这里进行配置
// 参考文档：https://www.npmjs.com/package/git-cz

module.exports = {
    "disableEmoji": false,
    "list": [
        "test",
        "feat",
        "fix",
        "chore",
        "docs",
        "refactor",
        "style",
        "ci",
        "perf"
    ],
    "maxMessageLength": 64,
    "minMessageLength": 3,
    "questions": [
        "type",
        "scope",
        "subject",
        "body",
        "breaking",
        "issues",
        "lerna"
    ],
    "scopes": [],
    // 翻译了一下描述部分
    "types": {
        "chore": {
            "description": "跟仓库主要业务无关的构建/工程依赖/工具等功能改动（比如新增一个文档生成工具）",
            "emoji": "🤖",
            "value": "chore"
        },
        "ci": {
            "description": "CI related changes",
            "emoji": "🎡",
            "value": "ci"
        },
        "docs": {
            "description": "更新了文档（比如改了 Readme）",
            "emoji": "✏️",
            "value": "docs"
        },
        "feat": {
            "description": "一个新的特性",
            "emoji": "🎸",
            "value": "feat"
        },
        "fix": {
            "description": "修复bug",
            "emoji": "🐛",
            "value": "fix"
        },
        "perf": {
            "description": "优化了性能的代码改动",
            "emoji": "⚡️",
            "value": "perf"
        },
        "refactor": {
            "description": "一些代码结构上优化，既不是新特性也不是修 Bug（比如函数改个名字）",
            "emoji": "💡",
            "value": "refactor"
        },
        "release": {
            "description": "Create a release commit",
            "emoji": "🏹",
            "value": "release"
        },
        "style": {
            "description": "代码的样式美化，不涉及到功能修改（比如改了缩进）",
            "emoji": "💄",
            "value": "style"
        },
        "test": {
            "description": "新增或者修改已有的测试代码",
            "emoji": "💍",
            "value": "test"
        }
    }
};
```

## commit message lint校验

当人多了，难免会出现commit不规范的问题，甚至不是多人开发的项目，规范commit message也是有必要的。
安装lint工具

``` bash
# commit lint工具
npm i @commitlint/cli -D
# commit lint 常用配置
npm i @commitlint/config-conventional -D
# 安装husky，以在commit message时触发检验规则
npm i husky
```

配置husky

``` json
"husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
}
```

添加配置文件.commitlintrc.js

``` javascript
module.exports = {
    // commit lint校验规则继承
    extends: ['@commitlint/config-conventional'],
    // 自定义校验规则
    rules: {},
};
```

配置完成后，每次commit就会进行校验，校验不通过会拦截commit

### 生成CHANGELOG.md

使用standard-version来生成CHANGELOG.md

安装使用:

``` bash
npm i -S standard-version
```

package.json 配置:

``` json
"scirpt": {
    ...,
    "release": "standard-version"
}
```

执行 `npm run release`  就会生成CHANGELOG.md

standard-version有很多功能，点击查看官方文档: [standard-version](https://www.npmjs.com/package/standard-version)

## 最后

附上参考文章:

* [规范你的 commit message 并且根据 commit 自动生成 CHANGELOG.md](https://juejin.im/post/6844903700574502919#heading-15)
* [优雅的提交你的 Git Commit Message](https://juejin.im/post/6844903606815064077#heading-10)
* [commitizen + husky 规范git提交信息](https://juejin.im/post/6844904025868271629)

很多地方是直接去npm搜索相关包进行查看文档的
