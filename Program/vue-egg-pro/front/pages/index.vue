<template>
  <div class="container">
    <h1>博客</h1>
    <div>
      <nuxt-link to="/resister">注册</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app',
  async mounted() {
    // console.log(this.$store)
    const ret = await this.$http.get('/demoinfo')
    console.log(ret)
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
