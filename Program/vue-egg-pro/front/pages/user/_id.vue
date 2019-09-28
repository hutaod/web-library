<template>
  <div class="kkb-container">
    <div></div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="'关注'+following.length" name="following">
        <div v-for="user in following" :key="user._id">
          <UserDisplay :user="user" />
        </div>
      </el-tab-pane>

      <el-tab-pane :label="'粉丝'+followers.length" name="followers">
        <div v-for="user in followers" :key="user._id">
          <UserDisplay :user="user" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="'文章'+articles.length" name="articles">文章 {{articles}}</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import ArticleItem from '~/components/ArticleItem.vue'
import UserDisplay from '~/components/UserDisplay.vue'

export default {
  components: {
    // ArticleItem,
    UserDisplay
  },
  data() {
    return {
      following: [],
      followers: [],
      articles: [],
      activeName: 'following'
    }
  },
  mounted() {
    const userid = this.$route.params.id
    this.userid = userid
    if (userid) {
      this.loadFollowing()

      this.loadFollowers()
      this.loadArticle()
    }
  },
  methods: {
    async loadFollowers() {
      // 粉丝
      const ret = await this.$http.get('/user/' + this.userid + '/followers')
      if (ret.code === 0) {
        this.followers = ret.data
      }
    },
    async loadFollowing() {
      // 关注
      const ret = await this.$http.get('/user/' + this.userid + '/following')
      if (ret.code === 0) {
        this.following = ret.data
      }
    },
    loadArticle() {},
    handleClick() {}
  }
}
</script>

<style>
</style>