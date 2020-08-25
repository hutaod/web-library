module.exports = {
  base: '/',
  title: '时羽·前端知识库',
  description: '前端,前端工程师,前端自学,前端进阶,前端发展',
  themeConfig: {
    sidebarDepth: 1,
    lastUpdated: 'Last Updated',
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '数据结构与算法', link: '/AlgorithmAndDataStructure/' },
      { text: '前端', link: '/front/' },
      { text: 'Nodejs', link: '/nodejs/' },
      { text: '扩展', link: '/extends/' },
      { text: 'GitHub', link: 'https://github.com/ht1131589588/web-library' },
    ],
    sidebar: {
      '/front/': [
        {
          title: 'JavaScript',
          collapsable: true,
          children: [
            'JavaScript/Type',
            'JavaScript/This',
            'JavaScript/Copy',
            'JavaScript/Prototype',
            'JavaScript/ES6',
            'JavaScript/Async',
            'JavaScript/Promise',
            'JavaScript/EventLoop',
            'JavaScript/JS进阶',
            'JavaScript/浏览器知识点',
            'JavaScript/JS常见的设计模式',
            'JavaScript/常见的数据结构',
            'JavaScript/JS原理探索',
          ],
        },
        {
          title: 'React系列',
          collapsable: true,
          children: [
            'React/React使用总结',
            'React/Redux源码探索',
            'React/React源码探索',
            // 'React/React常见面试题',
            // 'React/Redux-Saga探索',
            // 'React/Dva探索',
            // 'React/Umi探索',
            'React/Mobx使用总结',
          ],
        },
      ],
      '/extends/': [
        {
          title: 'Webpack 系列',
          collapsable: true,
          children: [
            ['Webpack/', '前言'],
            'Webpack/初识Webpack',
            'Webpack/Webpack基础',
            'Webpack/Webpack进阶',
            'Webpack/Webpack实战',
          ],
        },
      ],
      '/blog/': [
        {
          title: '博客',
          collapsable: false,
          children: [
            'commit规范及自动生成changelog',
            'coding-choice-and-growth/',
            '持续分享一些常用工具',
            'PerformanceOptimization'
          ],
        },
      ],
      '/AlgorithmAndDataStructure/': [
        {
          title: '数据结构与算法',
          collapsable: true,
          children: [
            '/AlgorithmAndDataStructure/复杂度分析',
            '/AlgorithmAndDataStructure/栈',
            '/AlgorithmAndDataStructure/刷题',
          ],
        },
      ],
    },
  },
}
