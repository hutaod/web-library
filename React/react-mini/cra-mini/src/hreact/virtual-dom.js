export default function initVNode(vnode) {
  let { vtype } = vnode
  if (!vtype) {
    // 文本节点
    return document.createTextNode(vnode)
  }

  if (vtype === 1) {
    // 原生元素
    return createElement(vnode)
  } else if (vtype === 2) {
    // 类组件
    return createClassComp(vnode)
  } else if (vtype === 3) {
    // 函数组件
    return createFuncComp(vnode)
  }
}

function createElement(vnode) {
  const { type, props } = vnode
  const node = document.createElement(type)
  const { key, children, ref, ...rest } = props
  Object.keys(rest).forEach(key => {
    // 给原生标签添加属性
    if (key === 'className') {
      node.setAttribute('class', rest[key])
    } else if (key === 'htmlFor') {
      node.setAttribute('for', rest[key])
    } else if (key === 'style') {
      const style = Object.keys(rest[key]).reduce((a, b) => {
        return a + (b + ':' + rest[key][b]) + ';'
      }, '')
      node.setAttribute('style', style)
    } else {
      node.setAttribute(key, rest[key])
    }
  })
  function setChildren(children) {
    children.forEach(c => {
      if (Array.isArray(c)) {
        setChildren(c)
      } else {
        node.appendChild(initVNode(c))
      }
    })
  }
  // 递归子元素
  setChildren(children)
  return node
}

function createClassComp(vnode) {
  const { type, props } = vnode
  const comp = new type(props)
  const newVNode = comp.render()
  return initVNode(newVNode)
}

function createFuncComp(vnode) {
  const { type, props } = vnode
  const newVNode = type(props)
  return initVNode(newVNode)
}
