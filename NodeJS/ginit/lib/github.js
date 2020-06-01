const CLI = require('clui')
const Configstore = require("configstore")
const Spinner = CLI.Spinner;
const { Octokit } = require("@octokit/rest")
const { createBasicAuth } = require("@octokit/auth-basic")

const inquirer = require("./inquirer")
const pkg = require("../package.json")

// 初始化本地存储配置
const conf = new Configstore(pkg.name)

let octokit;

module.exports = {
  // 获取octokit实例
  getInstance: () => {
    return octokit;
  },

  // 获取本地token
  getStoredGithubToken: () => {
    return conf.get("github.token")
  },

  // 通过个人账号信息获取token
  getPersonalAccessToken: async () => {
    // 1. 询问用户的账号和密码
    const credentials = await inquirer.askGithubCredentials();
    const status = new Spinner('验证身份中，请稍等...');

    status.start();

    // 2. 用createBasicAuth创建auth函数，用于后面调用
    const auth = createBasicAuth({
      // 用户名
      username: credentials.username,
      // 密码
      password: credentials.password,
      async on2Fa() {
        // ..
        status.stop();
        const res = await inquirer.getTwoFactorAuthenticationCode();
        status.start();
        return res.twoFactorAuthenticationCode
      },
      token: {
        // 一个授权信息使用范围的列表，你可以在GitHub上了解更多信息: https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/#available-scopes
        scopes: ['user', 'public_repo', 'repo', 'repo:status'],
        // 记录获取token的用途
        note: 'ginit, the command-line tool for initalizing Git repos',
      }
    });

    try {
      const res = await auth();
      if (res.token) {
        conf.set("github.token", res.token)
        return res.token
      } else {
        throw new Error('获取Github token失败')
      }
    } finally {
      status.stop()
    }
  },

  // 通过token登陆
  githubAuth: (token) => {
    octokit = new Octokit({
      auth: token,
    });
  },


}