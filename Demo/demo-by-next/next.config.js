const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");

module.exports = {
  webpack(config, ...args) {
    config = withLess().webpack(config, ...args);
    config = withSass({
      cssModules: true
    }).webpack(config, ...args);
    return config;
  }
};
