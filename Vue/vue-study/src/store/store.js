import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment(state, n = 1) {
      state.counter += n;
    }
  },
  getters: {
    score(state) {
      return `共扔出：${state.count}`;
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment", 2);
      }, 1200);
    }
  }
});
