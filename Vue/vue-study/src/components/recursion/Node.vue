<template>
  <div>
    <h3>{{data.title}}</h3>
    <node v-for="d in data.children" :key="d.id" :data="d"></node>
  </div>
</template>

<script>
export default {
  name: "Node", //对递归组件是必须的
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>
