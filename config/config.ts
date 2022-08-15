import { IConfig } from "dumi";

// import { akuiMobileMenusConfig } from "./akui-mobile";

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
    "/blog": [
      {
        title: "博客",
        collapsable: false,
        children: [
          "/blog/Github中的ci和cd",
          "/blog/commit规范及自动生成changelog",
          "/blog/coding-choice-and-growth/",
          "/blog/持续分享一些常用工具",
          "/blog/PerformanceOptimization",
          "/blog/开发工具常用快捷键集合",
          "/blog/懒加载图片组件实现",
          "/blog/code-review",
        ],
      },
    ],
    "/front": [
      {
        title: "JavaScript",
        collapsable: true,
        children: [
          "/front/JavaScript/Type",
          "/front/JavaScript/This",
          "/front/JavaScript/Copy",
          "/front/JavaScript/Prototype",
          "/front/JavaScript/ES6",
          "/front/JavaScript/Async",
          "/front/JavaScript/Promise",
          "/front/JavaScript/EventLoop",
          "/front/JavaScript/JS进阶",
          "/front/JavaScript/浏览器知识点",
          "/front/JavaScript/JS常见的设计模式",
          "/front/JavaScript/常见的数据结构",
          "/front/JavaScript/JS原理探索",
        ],
      },
      {
        title: "React系列",
        // collapsable: true,
        children: [
          "/front/React/React使用总结",
          "/front/React/Redux源码探索",
          "/front/React/React源码深入浅出",
          // 'React/React常见面试题',
          // 'React/Redux-Saga探索',
          // 'React/Dva探索',
          // 'React/Umi探索',
          "/front/React/Mobx使用总结",
          "/front/React/React运用技巧",
        ],
      },
    ],
    "/extends": [
      {
        title: "Webpack 系列",
        collapsable: true,
        children: [
          ["/extends/Webpack/", "前言"],
          "/extends/Webpack/初识Webpack",
          "/extends/Webpack/Webpack基础",
          "/extends/Webpack/Webpack进阶",
          "/extends/Webpack/Webpack实战",
        ],
      },
    ],
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
