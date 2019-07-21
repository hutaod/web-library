import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    features: [
      {
        id: 0,
        name: '类型检测'
      },
      {
        id: 1,
        name: '泛型'
      }
    ]
  },
  mutations: {
    addFeatureMutation(state: any, featureName: string) {
      state.features.push({
        id: state.features.length + 1,
        name: featureName
      })
    }
  },
  actions: {
    addFeature({ commit }, featureName: string) {
      commit('addFeatureMutation', featureName)
    }
  }
})
