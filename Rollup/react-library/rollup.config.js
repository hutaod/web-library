import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
// import clear from 'rollup-plugin-clear'
import postcss from "rollup-plugin-postcss";
import url from "rollup-plugin-url";
// import json from 'rollup-plugin-json'
import babel from "rollup-plugin-babel";
import pkg from "./package.json";

const external = Object.keys(pkg.dependencies);
// console.log(external)

export default {
  input: "components/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs"
      // sourcemap: true
    },
    {
      file: pkg.module,
      format: "es"
      // sourcemap: true
    }
  ],
  external: id => external.some(e => id.indexOf(e) === 0),
  plugins: [
    // json(),
    // clear({
    //   targets: ['dist']
    // }),
    postcss({
      modules: true,
      extensions: [".scss"]
    }),
    url(),

    babel({
      exclude: "**/node_modules/**",
      runtimeHelpers: true
    }),
    commonjs(),
    resolve({
      // dedupe: [ 'react' ],
      // customResolveOptions: {
      //   moduleDirectory: '../node_modules'
      // }
    })
  ]
};
