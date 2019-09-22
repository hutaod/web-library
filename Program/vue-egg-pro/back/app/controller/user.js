'use strict';
const md5 = require('md5');
const Controller = require('./base');

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '用户信息';
  }

  async checkEmail(email) {
    const user = await this.ctx.model.User.findOne({ email });
    return user;
  }

  async email() {
    const { ctx } = this;
    const email = ctx.query.email;
    const code = Math.random()
      .toString()
      .slice(2, 6);
    console.log('邮件', email, '   验证码', code);

    const title = '大前端开发验证码';
    const html = `
      <h1>注册验证码</h1>
      <div>
        <a href="http://docs.htonlinezone.cn/">${code}</a>
      </div>
    `;

    const hasSend = await this.service.tools.sendEmail({
      email,
      title,
      html,
    });
    ctx.session.emailCode = code;

    if (hasSend) {
      this.message('验证码发送成功');
    } else if (hasSend) {
      this.message('验证码发送失败');
    }
  }

  async captcha() {
    // 生成验证码
    const { ctx } = this;
    const captcha = await this.service.tools.captcha();
    ctx.session.captcha = captcha.text;
    console.log('验证码', captcha.text);
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }

  async register() {
    const { ctx } = this;
    const { email, password, emailcode, captcha, nickname } = ctx.request.body;
    // console.log(ctx.session.emailCode);
    if (emailcode !== ctx.session.emailCode) {
      return this.error('邮箱验证码出错');
    }
    // console.log(captcha, ctx.session.captcha);
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('图片验证码错误');
    }
    if (await this.checkEmail(email)) {
      return this.error('邮箱已经存在');
    }
    // 数据校验

    const ret = await ctx.model.User.create({
      email,
      nickname,
      password: md5(password),
    });

    if (ret._id) {
      this.success('注册成功');
    }
  }

  async login() {
    const { ctx, app } = this;
    const { email, password } = ctx.request.body;
    // 查询用户是否存在
    const user = await ctx.model.User.findOne({
      email,
      password: md5(password),
    });
    if (user) {
      // 生成token返回
      const { nickname } = user;
      const token = app.jwt.sign(
        {
          nickname,
          email,
          id: user._id,
        },
        app.config.jwt.secret,
        {
          expiresIn: '1h',
          // expiresIn: '60s',
        }
      );
      this.success({ token, email });
    } else {
      this.error('邮箱或密码错误');
    }
  }

  async detail() {
    // 只有token怎么获取详情
    const { ctx } = this;
    const user = await this.checkEmail(ctx.state.email);
    this.success(user);
  }

  async demoinfo() {
    // const { ctx } = this;
    console.log(this.ctx.session.emailCode);
    this.message('成功信息');
  }
}

module.exports = UserController;
