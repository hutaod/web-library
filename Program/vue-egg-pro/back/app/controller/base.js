'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  message(message) {
    this.ctx.body = {
      code: 0,
      message,
    };
  }

  // @ 公用代码抽离
  success(data) {
    this.ctx.body = {
      code: 0,
      data,
    };
  }

  error(message, code = -1) {
    this.ctx.body = {
      code,
      message,
    };
  }
}

module.exports = BaseController;
