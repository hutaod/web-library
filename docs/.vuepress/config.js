module.exports = {
  base: '/',
  title: '前端相关知识库',
  description: '前端,前端工程师,前端自学,前端进阶,前端发展',
  themeConfig: {
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    nav: [
      { text: '前端', link: '/front/' },
      { text: 'Nodejs', link: '/nodejs/' },
      { text: '扩展', link: '/extends/' },
      { text: 'GitHub', link: 'https://github.com/ht1131589588/web-library' }
    ],
    sidebar: {
      '/front/': [
        ['/front/JavaScript/', 'JavaScript'],
        ['/front/React/', 'React'],
        ['/front/Webpack/', 'Webpack']
      ]
    }
  }
}
