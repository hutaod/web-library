<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  beforeRouteEnter: (to, from, next) => {
    // 路由内部知道自己需要认证
    console.log(3);
    if (!window.isLogin) {
      // ...
    } else {
      next();
    }
  }
};
</script>

<style>
</style>

