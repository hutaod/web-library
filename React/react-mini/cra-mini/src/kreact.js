function createElement(type, props, ...children) {
  // console.log(arguments)
  props.children = children
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
    // 元素组件
    vtype = 1
  }
  // console.log(vtype)

  return {
    type,
    vtype,
    props
  }
}

export class Component {
  // 标识符，用于区分class和函数组件
  static isReactComponent = true

  constructor(props) {
    this.props = props
    this.state = {}
  }

  setState() {}
}

export default {
  createElement
}
