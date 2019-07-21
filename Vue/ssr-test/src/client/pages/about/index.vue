<template>
  <div>
    <h1>hi {{name}}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return { name: "美丽的世界" };
  },
  created() {
    console.log(123);
  }
};
</script>