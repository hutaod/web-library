const akuiMobileComponents = {
  functional: [
    "/akui-mobile/src/components/webp-image",
    "/akui-mobile/src/components/lazy-image",
    "/akui-mobile/src/components/scroll-view",
    "/akui-mobile/src/components/flat-list",
    "/akui-mobile/src/components/water-flow",
    "/akui-mobile/src/components/fixed-top",
    "/akui-mobile/src/components/count-down",
  ],
  dataDisplay: [
    "/akui-mobile/src/components/tab",
    "/akui-mobile/src/components/recommend-product-item",
    "/akui-mobile/src/components/recommend-product-list",
    "/akui-mobile/src/components/a-d-v-banner",
    "/akui-mobile/src/components/a-d-v-carousel",
    "/akui-mobile/src/components/a-d-v-dialog",
  ],
  dataEntry: ["/akui-mobile/src/components/phone-input"],
  feedback: ["/akui-mobile/src/components/toast"],
  verification: ["/akui-mobile/src/components/image-verify"],
};

export const akuiMobileMenusConfig = [
  {
    title: "概述",
    path: "/akui-mobile",
  },
  {
    title: "快速上手",
    path: "/akui-mobile/guide/quick-start",
  },
  {
    title: "CSS 变量",
    path: "/akui-mobile/guide/css-variables",
  },
  {
    title: "主题",
    path: "/akui-mobile/guide/theming",
  },
  {
    title: "按需加载",
    path: "/akui-mobile/guide/import-on-demand",
  },
  {
    title: "服务端渲染",
    path: "/akui-mobile/guide/ssr",
  },
  {
    title: "功能",
    children: akuiMobileComponents.functional,
  },
  {
    title: "业务展示",
    children: akuiMobileComponents.dataDisplay,
  },
  {
    title: "数据录入",
    children: akuiMobileComponents.dataEntry,
  },
  {
    title: "反馈",
    children: akuiMobileComponents.feedback,
  },
  {
    title: "安全校验",
    children: akuiMobileComponents.verification,
  },
];
