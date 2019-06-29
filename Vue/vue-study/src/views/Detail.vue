<template>
  <div>
    <div>{{$route.params.id}}</div>
    <div>{{id}}</div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  beforeEnter: (to, from, next) => {
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
