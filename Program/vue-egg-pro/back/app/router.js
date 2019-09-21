'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/userinfo', controller.user.index);
  router.get('/user/sendcode', controller.user.email);
  router.get('/user/captcha', controller.user.captcha);
  router.post('/user/register', controller.user.register);
  // 测试
  router.get('/demoinfo', controller.user.demoinfo);
};
