#!/usr/bin/env node

const chalk = require("chalk")
const clear = require("clear")
const figlet = require('figlet')

const file = require("./lib/file")
const github = require("./lib/github")
const repo = require("./lib/repo")

clear()

console.log(chalk.yellow(figlet.textSync('Ginit', { horizontalLayout: 'full' })))

if (file.directoryExists('.git')) {
  console.log(chalk.red('已经存在一个本地仓库！'));
  process.exit();
}

// const inquirer = require("./lib/inquirer")

// 获取github token
const getGithubToken = async () => {
  // 从本地获取token记录
  let token = github.getStoredGithubToken();
  if (token) {
    return token;
  }

  // 通过账号、密码获取token
  token = await github.getPersonalAccessToken();
  return token;
};

const run = async () => {
  // const credentials = await inquirer.askGithubCredentials();
  // console.log(credentials)

  try {
    // 获取token
    const token = getGithubToken()
    github.githubAuth(token);

    // 创建远程仓库
    const url = await repo.createRemoteRepo();

    // 创建 .gitignore
    await repo.createGitignore();

    // 初始化本地仓库并推送到远端
    await repo.setupRepo(url);

    console.log(chalk.green('All done!'));
  } catch (err) {
    if (err) {
      switch (err.status) {
        case 401:
          console.log(chalk.red("登陆失败，请提供正确的登陆信息"));
          break;
        case 422:
          console.log(chalk.red('远端已存在同名仓库'));
          break;
        default:
          console.log(chalk.red(err));
      }
    }
  }

}

run()
