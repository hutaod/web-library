let Vue;

class Store {
  constructor(options) {
    this.state = new Vue({
      data: options.state
    });

    this.mutations = options.mutations;
    this.actions = options.actions;
    options.getters && this.handleGetters(options.getters);
  }

  commit = (type, data) => {
    this.mutations[type](this.state, data);
  };

  dispatch = (type, data) => {
    this.actions[type](
      {
        commit: this.commit,
        state: this.state
      },
      data
    );
  };

  handleGetters(getters) {
    this.getters = {};
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state);
        }
      });
    });
  }
}

function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  });
}

export default {
  Store,
  install
};
