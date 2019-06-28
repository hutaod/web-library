<template>
  <li>
    <div @click="toggle">
      {{model.title}}
      <span>{{model.open ? '-' : '+'}}</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <Item class="item" v-for="(model, index) in model.children" :model="model" :key="index"></Item>
    </ul>
  </li>
</template>

<script>
export default {
  name: "Item",
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      open: false
    };
  },
  computed: {
    isFolder() {
      return this.model.children && this.model.children.length;
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    }
  }
};
</script>