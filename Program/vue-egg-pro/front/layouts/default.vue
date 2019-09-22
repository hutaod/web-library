<template>
  <el-container>
    <el-header>
      <el-menu class="el-mune-demo" mode="horizontal">
        <el-menu-item index="0">
          <img src="/logo.png" class="logo" alt="logo" />
        </el-menu-item>
        <el-menu-item index="1">
          <nuxt-link to="/">首页</nuxt-link>
        </el-menu-item>

        <el-menu-item v-if="usetInfo.id" index="3" class="pull-right">
          <nuxt-link to="/login">退出</nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="usetInfo.id" index="4" class="pull-right">
          <nuxt-link to="/user">{{usetInfo.nickname}}</nuxt-link>
        </el-menu-item>

        <el-menu-item v-if="usetInfo.id" index="3" class="pull-right">
          <nuxt-link to="/editor/new">
            <el-button type="primary">写文章</el-button>
          </nuxt-link>
        </el-menu-item>

        <el-menu-item v-if="!usetInfo.id" index="2" class="pull-right">
          <nuxt-link to="/login">登录</nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="!usetInfo.id" index="3" class="pull-right">
          <nuxt-link to="/register">注册</nuxt-link>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>底部信息</el-footer>
  </el-container>
</template>
<script>
export default {
  computed: {
    usetInfo() {
      return this.$store.state.user
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      // 获取用户个人信息
      const token = localStorage.getItem('HT_TOKEN')
      if (token) {
        this.$store.dispatch('user/detail')
      }
    }
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.pull-right {
  float: right !important;
}
.logo {
  height: 37px;
}
a {
  text-decoration: none;
}
</style>
