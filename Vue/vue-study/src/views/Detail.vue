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
  }
};
</script>

<style>
</style>
