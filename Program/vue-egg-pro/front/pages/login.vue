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
      <el-button
        type="primary"
        sytle="width:100%;margin-bottom:30px"
        @click.native.prevent="handleLogin"
      >登录</el-button>
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
        password: '123456'
      },
      registerRule: {
        email: [
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入正确的邮箱' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { max: 12, message: '密码长度12以内' }
        ]
      },
      passwordType: 'password'
    }
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const obj = {
            email: this.form.email,
            password: md5(this.form.password)
          }
          const ret = await this.$store.dispatch('user/login', obj)
          // this.$http.post('/user/login', obj)
          if (ret.code === 0) {
            // 跳转首页
            this.$notify({
              title: '登录成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 1500)
          } else {
            this.$notify({
              title: ret.message,
              type: 'warning'
            })
          }
        }
      })
    },
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    }
  }
}
</script>


<style lang="scss">
</style>
