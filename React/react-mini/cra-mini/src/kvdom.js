export default function initVnode(vnode) {
  let { vtype } = vnode

  if (!vtype) {
    // 是文本节点
    return document.createTextNode(vnode)
  }

  if (vtype === 1) {
    // 是文本节点
    return createElement(vnode)
  } else if (vtype === 2) {
    return createClassComp(vnode)
  } else if (vtype === 3) {
    return createFuncComp(vnode)
  }
}

function createElement(vnode) {
  const { type, props } = vnode
  // 'div' {}
  const node = document.createElement(type)
  const { key, children, ...rest } = props
  Object.keys(rest).forEach(k => {
    // 给原生标签添加属性
    if (k === 'className') {
      node.setAttribute('class', rest[k])
    } else {
      node.setAttribute(k, rest[k])
    }
  })

  // 递归子元素
  children.forEach(c => {
    // console.log(c)
    const child = initVnode(c)
    // console.log(child)
    if (child) {
      node.appendChild(child)
    }
  })

  return node
}

function createClassComp(vnode) {
  const { type, props } = vnode
  // class xxx {...}
  const comp = new type(props)
  // vdom
  const newVNode = comp.render()
  return initVnode(newVNode)
}

function createFuncComp(vnode) {
  const { type, props } = vnode
  // function xxx {...}
  const newVNode = type(props)
  return initVnode(newVNode)
}
