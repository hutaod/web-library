export const actions = {
  /**
   * nuxtServerInit 必须声明在根模块
   * @param {Object} param0 action上下文
   * @param {*} param1 组件上下文
   */
  nuxtServerInit({ commit }, ctx) {
    // console.log(ctx)
    const token = ctx.app.$cookies.get('token')
    if (token) {
      console.log('nuxtServerInit: token:' + token)
      commit('user/SET_TOKEN', token)
    }
  }
}
