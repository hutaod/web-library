const CLI = require("clui")
const fs = require("fs")
const git = require('simple-git/promise')
const Spinner = CLI.Spinner
const touch = require("touch")
const _ = require("lodash")

const inquirer = require('./inquirer')
const gh = require('./github')

module.exports = {
  // 创建远程仓库
  createRemoteRepo: async () => {
    const github = gh.getInstance();
    const answers = await inquirer.askRepoDetails();

    const data = {
      name: answers.name,
      description: answers.description,
      private: answers.visibility === 'private',
    }

    const status = new Spinner('创建远程仓库中...');
    status.start()
    try {
      const res = await github.repos.createForAuthenticatedUser(data)
      return res.data.ssh_url
    } finally {
      status.stop()
    }
  },
  // 创建 git ignore
  createGitIgnore: async () => {
    const fileList = _.without(fs.readdirSync('.'), '.git', '.gitignore');
    if (fileList.length) {
      const answers = await inquirer.askIgnoreFiles(fileList);
      if (answers.ignore.length) {
        // 写入信息
        fs.readFileSync('.gitignore', answers.ignore.join('\n'))
      } else {
        // 创建文件
        touch('.gitignore')
      }
    } else {
      // 创建文件
      touch('.gitignore')
    }
  },
  // 设置
  setupRepo: async (url) => {
    const status = new Spinner('初始化本地仓库并推送到远端仓库中...');
    status.start();

    try {
      await git.init();
      await git.add('.gitignore');
      await git.add('./*');
      await git.commit('Initial commit')
      await git.addRemote('origin', url);
      await git.push('origin', 'master');
    } finally {
      status.stop();
    }
  },

}