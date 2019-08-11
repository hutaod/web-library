export default function createElement(type, props, ...children) {
  props.children = children
  // console.log(arguments)
  // 通过vtype区分3种组件：1-元素，2-class组件，3-函数组件
  let vtype
  if (typeof type === 'function') {
    if (type.isReactComponent) {
      // 类组件
      vtype = 2
    } else {
      // 函数组件
      vtype = 3
    }
  } else if (typeof type === 'string') {
    // 原生标签
    vtype = 1
  }
  return {
    type,
    vtype,
    props
  }
}
