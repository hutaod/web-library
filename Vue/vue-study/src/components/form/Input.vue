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
      this.$emit("input", e.target.value);
      this.$emit("validate");
    }
  }
};
</script>

<style>
</style>
