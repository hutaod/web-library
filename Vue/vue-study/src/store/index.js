import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: { permission, user },
  // 全局定义getters便于访问
  getters: {
    // 角色
    roles: state => state.user.roles,
    // 权限路由
    permission_routes: state => state.permission.routes,
    // 是否有权限判断
    hasPermission: state => pRoles => {
      console.log(pRoles)
      // 获取用户角色
      const roles = state.user.roles

      if (pRoles && Array.isArray(pRoles) && pRoles.length) {
        // 判断用户是否有该当前dom权限
        const hasPremission = roles.some(() => pRoles.includes(roles))
        return hasPremission
      } else {
        throw new Error(`需要指定要求角色数组，如['admin']`)
      }
    }
  }
})

export default store
