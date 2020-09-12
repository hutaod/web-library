# Github 中的 CI/CD

主要分享和记录使用 `Github` 中的 `CI/CD` 功能的过程：

- npm 包自动化发布

## npm 包自动化发布

具体实现步骤：

- 创建 `workflow` 模板，并修改 npm-publish 配置文件
- 配置 `.npmignore` 文件
- 获取 `npm token`
- 配置 `secrets`
- 一些注意事项

### 创建 workflow 模板，并修改 npm-publish 配置文件

先进入创建 `workflow` 模板页面

![创建workflow模板](./imgs/create_action.png)

这时会让你编辑配置文件 `npm-publish.ymal`

删除 `publish-gpr`配置

![删除publish-gpr](./imgs/create_action2.png)

修改`on`事件监听部分

![修改on](./imgs/create_action3.png)

然后提交

![提交npm-publish.ymal](./imgs/create_action4.png)

### 配置 `.npmignore` 文件

```
node_modules
.github
```

### 获取 `npm token`

![获取token](./imgs/create_token.png)
![获取token](./imgs/create_token2.png)
![获取token](./imgs/create_token3.png)

创建成功后单击就可以复制 token（token 在页面关闭后将不再出现）

### 配置 `secrets`

打开 github 项目页面选择 Settings -> Secrets -> add a new secret

![新建secret](./imgs/set_secrets.png)

![新建secret](./imgs/set_secrets2.png)

### 注意事项

- `package.json` 与 `package-lock.json` 版本号必须一致
- 必须要有 `package-lock.json`

### 查看构建过程

![building](./imgs/building.png)

### 参考文章

- [Github 持续化集成 工作流 Npm 包自动化发布](https://www.cnblogs.com/gaobw/p/11593602.html)
