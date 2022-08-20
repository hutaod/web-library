import { IConfig } from "dumi";

import { blogConfig } from "./blog";
import { extendsConfig } from "./extends";
import { frontConfig } from "./front";

const config: IConfig = {
  navs: [
    { title: "博客", path: "/blog" },
    { title: "前端", path: "/front" },
    { title: "扩展", path: "/extends" },
    { title: "GitHub", path: "https://github.com/ht1131589588/web-library" },
  ],
  menus: {
    "/": [
      {
        title: "首页",
        path: "index",
      },
    ],
    "/blog": blogConfig,
    "/front": frontConfig,
    "/extends": extendsConfig,
  },
  metas: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover",
    },
  ],
  scripts: [
    `if (location.pathname.startsWith('/~demos/')) {
      document.body.style.background = '#f5f7fa'
    }`,
    `
    if (!location.port) {
      // Enable Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'UA-72788897-2');
    }
    `,
    "https://s9.cnzz.com/z_stat.php?id=1280306924&web_id=1280306924",
    {
      src: "https://www.googletagmanager.com/gtag/js?id=UA-72788897-2",
      async: true,
    },
  ],
  styles: [
    `
    html {
      touch-action: manipulation;
    }
    #root .__dumi-default-mobile-demo-layout {
      padding: 0;
    }
    a[title='站长统计'] {
      display: none;
    }
    html {
      min-height: 100vh;
    }
    `,
  ],
  themeConfig: {
    hd: {
      rules: [
        // {mode: 'vw', options: [100, 750]}
      ],
    },
  },
  plugins: ["./.dumi/plugin-gallery/index.ts"],
  proxy: {
    "/capi": {
      target: "https://test-ec-mall.akulaku.com",
      changeOrigin: true,
      cookieDomainRewrite: "localhost",
    },
  },
};

export default config;
