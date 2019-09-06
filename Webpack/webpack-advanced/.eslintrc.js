module.exports = {
  // 配置解析器
  parser: 'babel-eslint',
  // 继承 eslint-config-airbnb，多个时用数组
  extends: 'airbnb',
  env: {
    browser: true,
    node: true
  },
  // lint规则
  rules: {
    // 不使用结尾分号
    semi: ['error', 'never'],
    // 允许使用console.log
    'no-console': 'off',
    // 设置使用jsx文件类型
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // 禁用拖尾逗号
    // 'comma-dangle': ['error', 'never'],
    // 关闭 只导出一个变量时必须使用默认导出
    'import/prefer-default-export': 'off'
  }
}
