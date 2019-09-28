'use strict';

const Service = require('egg').Service;
const nodemailer = require('nodemailer');
const svgCaptcha = require('svg-captcha');

const userEmail = '1131589588@qq.com';
const transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secureConnection: true,
  auth: {
    user: userEmail,
    pass: 'aaeeezynivvpjebb',
  },
});

class Tools extends Service {
  // 发送邮箱验证码
  async sendEmail({ email, title, html }) {
    const mailOptions = {
      from: userEmail,
      to: email,
      subject: title,
      text: '',
      html,
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      return true;
    }
  }
  // 生成图形验证码
  async captcha() {
    return svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
    });
  }
}

module.exports = Tools;
