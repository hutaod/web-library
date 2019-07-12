<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span
          v-if="item.redirect==='noRedirect'||index==levelList.length-1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
import pathToRegexp from "path-to-regexp";
export default {
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route: {
      handler() {
        this.getBreadcrumb();
      },
      // 组件创建时立即执行一次
      immediate: true
    }
  },
  methods: {
    getBreadcrumb() {
      // console.log(this.$route.matched);
      // 面包屑仅显示包含meta.title且item.meta.breadcrumb不为false的路由
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      ); // 根路由
      // console.log(matched);
      const first = matched[0];
      // 根匹配只要不是home，就作为home下一级
      if (!this.isHome(first)) {
        matched = [
          { path: "/", redirect: "/home", meta: { title: "首页" } }
        ].concat(matched);
      } // 处理完指定到levelList
      this.levelList = matched;
    },
    isHome(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === "home".toLocaleLowerCase();
    },
    pathCompile(path) {
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item; // 若存在重定向，按重定向走
      if (redirect) {
        this.$router.push(redirect);
        return;
      } // 编译path，避免存在路径参数
      this.$router.push(this.pathCompile(path));
    }
  }
};
</script>
<style scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
.app-breadcrumb.el-breadcrumb .no-redirect {
  color: #97a8be;
  cursor: text;
}
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}
.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
.breadcrumb-move {
  transition: all 0.5s;
}
.breadcrumb-leave-active {
  position: absolute;
}
</style>