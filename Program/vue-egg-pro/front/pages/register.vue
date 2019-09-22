<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rule="registerRule" class="login-form">
      <div class="title-container">
        <img src="/logo.png" alt />
      </div>
      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-mobile"></i>
        </span>
        <el-input v-model="form.email" placeholder="邮箱" name="email"></el-input>
      </el-form-item>
      <!-- 邮箱验证 -->
      <!-- 邮箱验证码 -->
      <el-form-item prop="emailcode" class="email-code">
        <div class="send-email-btn">
          <el-button type="primary" @click="sendCode">发送</el-button>
        </div>
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>

        <el-input v-model="form.emailcode" placeholder="邮箱验证码" name="emailcode"></el-input>
      </el-form-item>

      <!-- 昵称 -->
      <el-form-item prop="nickname">
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>
        <el-input v-model="form.nickname" placeholder="昵称" name="nickname"></el-input>
      </el-form-item>

      <!-- 图形验证码 -->
      <el-form-item prop="captcha" class="email-code">
        <div class="send-email-btn">
          <img :src="code.captcha" alt @click="resetCptcha" />
        </div>
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>

        <el-input v-model="form.captcha" placeholder="图形验证码" name="captcha"></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          :key="passwordType"
          v-model="form.password"
          placeholder="密码"
          name="password"
          :type="passwordType"
        ></el-input>
        <span class="show-pwd" @click="showPwd">
          <i v-if="passwordType=='password'" class="el-icon-lock"></i>
          <i v-else class="el-icon-key"></i>
        </span>
      </el-form-item>
      <!-- 重复密码 -->
      <el-form-item prop="repassword">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input v-model="form.repassword" placeholder="再次输入密码" name="repassword" type="password"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        sytle="width:100%;margin-bottom:30px"
        @click.native.prevent="handleRegister"
      >注册</el-button>
    </el-form>
  </div>
</template>

<script>
import md5 from 'md5'

export default {
  layout: 'login',
  data() {
    return {
      form: {
        email: '1131589588@qq.com',
        emailcode: '5238',
        password: '123456',
        repassword: '123456',
        captcha: 'HkGy',
        nickname: '沐阳'
      },
      registerRule: {
        email: [
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入正确的邮箱' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { max: 12, message: '密码长度12以内' }
        ],
        emailcode: [{ required: true, message: '请输入邮箱验证码' }],
        captcha: [{ required: true, message: '请输入验证码' }],
        repassword: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error('两次输入不一致'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      passwordType: 'password',
      code: {
        captcha: '/api/user/captcha'
      }
    }
  },
  methods: {
    handleRegister() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log('loading状态切换')
          const obj = {
            email: this.form.email,
            password: md5(this.form.password),
            emailcode: this.form.emailcode,
            captcha: this.form.captcha,
            nickname: this.form.nickname
          }
          const ret = await this.$http.post('/user/register', obj)
          // console.log(ret)
          if (ret.code === 0) {
            // 注册成功信息提醒
            // 跳转登录页
            this.$notify({
              title: '注册成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: ret.message,
              type: 'warning'
            })
          }
        }
      })
    },
    async sendCode() {
      const ret = await this.$http.get(
        '/user/sendcode?email=' + this.form.email
      )
      if (ret.code === 0) {
        this.$notify({
          title: '发送成功',
          type: 'success'
        })
      }
    },
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    resetCptcha() {
      this.code.captcha = '/api/user/captcha?_t=' + Date.now()
    }
  }
}
</script>


<style lang="scss" scoped>
.email-code {
  width: 340px;
  position: relative;
  .send-email-btn {
    position: absolute;
    right: -110px;
    .el-button {
      width: 90px;
      height: 50px;
    }
    img {
      width: 90px;
      height: 50px;
      cursor: pointer;
    }
  }
}
</style>

