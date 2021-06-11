module.exports = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: "PLUGIN_NAME",
    Once(styles, { result, atRule, postcss }) {
      console.log(styles, { result, atRule, postcss });
    },
    /*
    Root (root, postcss) {
      // Transform CSS AST here
    }
    */

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  };
};

module.exports.postcss = true;
