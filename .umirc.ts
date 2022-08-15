import { defineConfig } from "dumi";
import path from "path";
import config from "./config/config";

export default defineConfig({
  // more config: https://d.umijs.org/config
  ...config,
  mode: "site",
  title: "拾光者·前端知识库",
  outputPath: "./docs-dist",
  mfsu: { production: { output: '.mfsu-production' } },
  base: "/",
  publicPath: "/",
  resolve: {
    includes: ["docs", "src"],
    passivePreview: true,
  },
  alias: {
    "@root": process.cwd(),
    "@docs": path.resolve(__dirname, "./docs"),
    "@dumiTheme": path.resolve(__dirname, "./.dumi/theme"),
    "demos": path.resolve(__dirname, "./src/demos/index.ts"),
  },
  extraBabelPlugins: [
    [
      "babel-plugin-jsx-css-modules",
      {
        styleFileReg: [/\.module\.(css|less|scss)$/],
        prefer: "local",
        helperImportType: "esm",
      },
    ],
    [
      "babel-plugin-import",
      {
        libraryName: "@fexd/tools",
        camel2DashComponentName: false,
        libraryDirectory: "es",
      },
      "@fexd/tools",
    ],
  ],
});
