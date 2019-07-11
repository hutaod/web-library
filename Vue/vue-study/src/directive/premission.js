import store from '@/store'

const premission = {
  /**
   * 当被绑定的元素插入到 DOM 中时
   * @param {Element} el 指令相关dom元素
   * @param {Object} binding 对象 {name: 'premission', expression: [], value: true}
   * @example v-premission="['admin']"
   */
  inserted(el, binding) {
    // 获取指令的值：按钮要求的角色数组
    // 解构value并取别名pRoles
    const { value: pRoles } = binding
    // 获取用户角色
    const roles = store.getters && store.getters.roles
    if (pRoles && Array.isArray(pRoles) && pRoles.length) {
      // 判断用户是否有该当前dom权限
      const hasPremission = roles.some(r => pRoles.includes(r))
      if (!hasPremission) {
        // 无权限时删除当前当前dom
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`需要指定按钮要求角色数组，如v-permission="['admin']"`)
    }
  }
}

export default premission
