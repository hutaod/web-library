'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });
  router.get('/', controller.home.index);

  // 用户
  router.get('/userinfo', controller.user.index);
  router.get('/user/sendcode', controller.user.email);
  router.get('/user/captcha', controller.user.captcha);
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.get('/user/detail', jwt, controller.user.detail);

  // 文章
  router.get('/article', jwt, controller.article.index);
  router.post('/article/create', jwt, controller.article.create);

  // 测试
  router.get('/demoinfo', controller.user.demoinfo);
};
