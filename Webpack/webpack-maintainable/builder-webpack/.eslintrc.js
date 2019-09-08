module.exports = {
  // 配置解析器
  parser: 'babel-eslint',
  // 继承 eslint-config-airbnb，多个时用数组
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
  },
};
