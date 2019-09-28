'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });

  // 用户相关
  router.group({ name: 'user', prefix: '/user' }, router => {
    router.get('/', controller.user.index);
    router.get('/sendcode', controller.user.email);
    router.get('/captcha', controller.user.captcha);
    router.post('/register', controller.user.register);
    router.post('/login', controller.user.login);
    router.get('/detail', jwt, controller.user.detail);
    // 获取关注状态
    router.get('/isfollow/:id', jwt, controller.user.isFollow);
    // 关注
    router.put('/follow/:id', jwt, controller.user.follow);
    // 取消关注
    router.delete('/follow/:id', jwt, controller.user.unfollow);
    // 获取用户acticle的状态
    router.get('/article/:id', jwt, controller.user.articleStatus);

    // 点赞
    router.put('/likeArticle/:id', jwt, controller.user.likeArticle);
    // 取消赞
    router.delete('/likeArticle/:id', jwt, controller.user.cancelLikeArticle);
    // 踩
    router.put('/dislikeArticle/:id', jwt, controller.user.dislikeArticle);
    // 取消踩
    router.delete(
      '/dislikeArticle/:id',
      jwt,
      controller.user.cancelDislikeArticle
    );
    router.get('/:id/followers', controller.user.followers);
    router.get('/:id/following', controller.user.following);
  });

  router.get('/', controller.home.index);

  // 文章
  router.get('/article', controller.article.index);
  router.get('/article/:id', controller.article.detail);
  router.post('/article/create', jwt, controller.article.create);

  // 测试
  router.get('/demoinfo', controller.user.demoinfo);
};
