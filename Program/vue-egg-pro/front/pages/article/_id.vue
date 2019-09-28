<template>
  <div class="container">
    <UserDisplay :user="article.author">
      <el-button type="success" v-if="isFollow" @click="unfollow">已关注</el-button>
      <el-button v-else @click="follow">关注</el-button>
    </UserDisplay>
    <el-divider></el-divider>
    <div class="article" v-html="article.article_html"></div>
    <el-divider></el-divider>
    <div>被查看：{{article.views}}次</div>
    <el-divider></el-divider>
    <div>
      <el-button @click="likeAction" :type="likeStatus?'success':'info'">
        <i class="el-icon-thumb">{{article.like}}</i>
      </el-button>

      <el-button @click="dislikeAction" :type="dislikeStatus?'success':'info'">
        <i class="el-icon-thumb rotate180"></i>
        {{article.dislike}}
      </el-button>
    </div>
  </div>
</template>

<script>
import UserDisplay from '~/components/UserDisplay.vue'
export default {
  components: { UserDisplay },
  data() {
    return {
      isFollow: false,
      likeStatus: false,
      dislikeStatus: false,
      article: {
        title: '',
        views: 0,
        like: 0,
        dislike: 0,
        author: {}
      }
    }
  },
  mounted() {
    const { id } = this.$route.params
    this.id = id
    if (id) {
      this.getArticle()
    }
    const token = localStorage.getItem('HT_TOKEN')
    if (token) {
      // 用户登录状态
      this.getLikeStatus()
    }
  },
  methods: {
    async getArticle() {
      const ret = await this.$http.get('/article/' + this.id)
      this.article = ret.data
      this.checkFollowStatus()
    },
    async likeAction() {
      const type = this.likeStatus ? 'delete' : 'put'
      const ret = await this.$http[type]('/user/likeArticle/' + this.id)
      if (ret.code === 0) {
        this.getLikeStatus()
        this.getArticle()
        this.$notify({
          title: ret.message,
          type: 'success'
        })
      }
    },

    async getLikeStatus() {
      // 获取喜欢状态
      const ret = await this.$http.get('/user/article/' + this.id)
      if (ret.code === 0) {
        this.likeStatus = ret.data.like
        this.dislikeStatus = ret.data.dislike
      }
      console.log(ret)
    },

    async dislikeAction() {
      const type = this.dislikeStatus ? 'delete' : 'put'
      const ret = await this.$http[type]('/user/dislikeArticle/' + this.id)
      if (ret.code === 0) {
        this.getArticle()
        this.getLikeStatus()
        this.$notify({
          title: ret.message,
          type: 'success'
        })
      }
    },

    async checkFollowStatus() {
      const isFollow = await this.$http.get(
        '/user/isfollow/' + this.article.author._id
      )
      if (isFollow.code === 0) {
        this.isFollow = isFollow.data.isFollow
      }
    },
    async follow() {
      const ret = await this.$http.put(
        '/user/follow/' + this.article.author._id
      )
      this.checkFollowStatus()
      console.log(ret)
    },
    async unfollow() {
      const ret = await this.$http.delete(
        '/user/follow/' + this.article.author._id
      )
      this.checkFollowStatus()
      console.log(ret)
    }
  }
}
</script>

<style scoped>
.article {
  padding: 20px;
}
</style>