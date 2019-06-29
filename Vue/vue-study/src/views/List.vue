<template>
  <div>
    <div>{{testName}}</div>
    <div>{{$route.query.a}}</div>
  </div>
</template>

<script>
export default {
  props: {
    testName: {
      type: String
    }
  },
  data() {
    return {
      a: "123"
    };
  },
  mounted() {
    // console.log(this.$route);
  }
};
</script>

<style>
</style>
