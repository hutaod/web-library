/**
 *
 * @param {Object} param0 上下文
 * @param {Function} inject inject函数
 * 参考链接https://zh.nuxtjs.org/guide/plugins
 */
export default function({ $axios }, inject) {
  // 同时在context，Vue实例，甚至Vuex中同时注入
  inject('login', user => {
    return $axios.$post('/api/login', user)
  })
}
