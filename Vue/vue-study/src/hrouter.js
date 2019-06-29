import Vue from "vue";
import Home from "./views/Home.vue";
import About from "./views/About";

class VueRouter {
  constructor(options) {
    this.$options = options;
    this.routeMap = {};

    this.app = new Vue({
      data: {
        current: ""
      }
    });
  }
  init() {
    this.bindEvents(); // 监听url变化
    this.createRouteMap(this.$options); // 解析路由配置
    this.initComponents(); // 实现两个组件
  }

  bindEvents() {
    window.addEventListener("load", this.onHashChange);
    window.addEventListener("hashchange", this.onHashChange);
  }

  onHashChange = () => {
    this.app.current = window.location.hash.slice(1) || "/";
  };

  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component;
    });
  }

  initComponents() {
    // <router-link>去哪</router-link>
    Vue.component("router-link", {
      props: {
        to: String
      },
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: "#" + this.to
            }
          },
          [this.$slots.default]
        );
      }
    });

    // <router-view></router-view>
    Vue.component("router-view", {
      render: h => {
        const comp = this.routeMap[this.app.current];
        return h(comp);
      }
    });
  }
}

VueRouter.install = function(_Vue) {
  // 混入
  _Vue.mixin({
    beforeCreate() {
      // this 是vue实例，有传入router时才会添加路由
      if (this.$options.router) {
        // 仅会在根元素执行一次
        _Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    }
  });
};

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/about",
      component: About
    }
  ]
});
