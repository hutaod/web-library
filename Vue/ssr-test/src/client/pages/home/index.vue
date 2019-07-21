<template>
  <div>
    <h1>hi {{name}}</h1>
    <div>vuexCount： {{$store.state.count}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return { name: "首页" };
  },
  created() {
    console.log(123);
  }
};
</script>