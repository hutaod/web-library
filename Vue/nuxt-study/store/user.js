export const state = () => ({
  token: ''
})

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  }
}

export const getters = {
  isLogin(state) {
    return !!state.token
  }
}

export const actions = {
  login({ commit, getters }, u) {
    // 利用nuxt提供inject的方法注入
    // this值store的实例
    return this.$login(u).then(({ token }) => {
      if (token) {
        commit('SET_TOKEN', token)
      }
      return getters.isLogin
    })
  }
}
