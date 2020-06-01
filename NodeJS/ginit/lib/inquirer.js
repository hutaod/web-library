const inquirer = require('inquirer')
const file = require('./file')

module.exports = {
  askGithubCredentials: () => {
    const questions = [
      {
        name: 'username',
        type: 'input',
        message: '请输入你的git账号或邮箱地址:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return '请输入你的git账号或邮箱地址.';
          }
        },
      },
      {
        name: 'password',
        type: 'password',
        message: '请输入你的密码:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return '请输入你的密码.';
          }
        },
      }
    ];

    return inquirer.prompt(questions)
  },

  // 询问双重认证码
  getTwoFactorAuthenticationCode: () => {
    return inquirer.prompt({
      name: 'twoFactorAuthenticationCode',
      type: 'input',
      message: '请输入你的双重认证验证码:',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return '请输入你的双重认证验证码:.';
        }
      },
    })
  },

  // 询问仓库详细信息
  askRepoDetails: () => {
    const argv = require("minimist")(process.argv.slice(2))
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: '请输入git仓库名称:',
        default: argv._[0] || file.getCurrentDirectoryBase(),
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return '请输入git仓库名称.';
          }
        },
      },
      {
        type: 'input',
        name: 'description',
        default: argv._[1] || null,
        message: '请输入仓库描述（选填）:',
      },
      {
        type: 'list',
        name: 'visibility',
        message: '共有仓库 或 私有仓库:',
        choices: ['public', 'private'],
        default: 'public',
      },
    ]
    return inquirer.prompt(questions)
  },

  // 选择需要忽略的文件
  askIgnoreFiles: fileList => {
    const questions = [
      {
        type: "checkbox",
        name: "ignore",
        message: "请选择你想忽略掉的文件:",
        choices: fileList,
        default: ['node_modules', 'bower_components'],
      }
    ]
    return inquirer.prompt(questions)
  }

}