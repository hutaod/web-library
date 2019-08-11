class Component {
  // 标识符，用于区分class和函数组件
  static isReactComponent = true

  constructor(props) {
    this.props = props
    this.state = {}
  }

  setState() {}
}

export default Component
