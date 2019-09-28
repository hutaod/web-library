<template>
  <div class="user" v-if="user">
    <nuxt-link :to="url">
      <img class="user-avatar" :src="user.avatar" alt />
      {{user.nickname}}
    </nuxt-link>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['user'],
  computed: {
    url() {
      return '/user' + (this.user ? '/' + (this.user.id || this.user._id) : '')
    }
  }
}
</script>

<style lang='scss'>
.user {
  display: inline-block;
  padding: 5px;
  a {
    color: #67c23a;
  }
  .user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
</style>