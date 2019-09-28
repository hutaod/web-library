<template>
  <div :key="article._id" class="article-item">
    <nuxt-link :to="'/article/'+article._id">
      <h2 style="width:900px;">{{article.title}}</h2>
    </nuxt-link>

    <p>
      <span class="user">
        {{article.author.nickname}}
        <img class="user-avatar" :src="article.author.avatar" alt />
      </span>
      <span class="action">
        <i class="el-icon-view">{{article.views}}</i>
      </span>

      <span class="action">
        <i class="el-icon-thumb">{{article.like}}</i>
      </span>

      <span class="action">
        <i class="el-icon-thumb rotate180"></i>
        {{article.dislike}}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  padding: 20px 15px;
  border-bottom: 2px solid #eee;
  a {
    color: #67c23a;
  }
  .action {
    display: inline-block;
    width: 50px;
    i {
      letter-spacing: 5px;
    }
  }
  .user {
    display: inline-block;
    width: 150px;
  }
}
</style>>
