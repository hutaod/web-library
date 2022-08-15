export default {
  cjs: {
    type: "babel",
    minify: true,
    lazy: true,
  },
  esm: {
    type: "babel",
  },
  runtimeHelpers: true,
  extractCSS: true,
  disableTypeCheck: false,
  // 把less引入转为css引入
  lessInBabelMode: true,
};
