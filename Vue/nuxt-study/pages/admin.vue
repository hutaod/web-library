<template>
  <div>admin</div>
</template>

<script>
export default {
  middleware: ["auth"],
  asyncData() {
    return new Promise(resolve => {
      setTimeout(function() {
        resolve({});
      }, 1000);
    });
  }
};
</script>

<style>
</style>
