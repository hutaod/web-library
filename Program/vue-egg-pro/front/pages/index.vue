<template>
  <div class="container">
    <ArticleItem v-for="article in articles" :key="article._id" :article="article"></ArticleItem>
  </div>
</template>

<script>
import ArticleItem from '~/components/ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  async asyncData({ app, params, store }) {
    // console.log(Object.keys(store))
    // console.log(Object.keys(app))
    const ret = await app.$axios.get('/api/article')
    console.log(ret.data.data)
    return {
      articles: ret.data.data
    }
    // return {user:ret.data}
  }
}
</script>

<style>
.container {
  margin: 0 auto;
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
