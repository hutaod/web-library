<template>
  <node :data="data"></node>
</template>

<script>
import Node from "./Node";
export default {
  components: {
    Node
  },
  data() {
    return {
      data: {
        title: "递归组件",
        children: [
          {
            title: "子节点1",
            children: [
              {
                title: "c1-1"
              }
            ]
          },
          {
            title: "子节点2",
            children: [
              {
                title: "c2-1"
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<style>
</style>
