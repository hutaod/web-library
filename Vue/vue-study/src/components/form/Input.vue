<template>
  <div>
    <input :value="value" @input="handleInput">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },

  methods: {
    handleInput(e) {
      console.log(1);
      this.$emit("input", e.target.value);
      console.log(this.$parent);
      this.$parent.$emit("validate");
    }
  }
};
</script>

<style>
</style>
