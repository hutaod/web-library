import React, { Component, PureComponent } from 'react'

function MyComponent(props) {
  console.log(123)
  return (
    <div>
      <div>{props.title}</div>
      <div>{props.arr}</div>
    </div>
  )
}

class B extends PureComponent {
  render() {
    const props = this.props
    console.log(223)
    return (
      <div>
        <h3>B</h3>
        <div>{props.title}</div>
        <div>{props.arr}</div>
      </div>
    )
  }
}

const A = React.memo(MyComponent, function(prevProps, nextProps) {
  console.log(prevProps, nextProps)
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
})
// const A = React.memo(MyComponent)
// const A = MyComponent
// React.isValidElement 判断是否时React元素，不包含组件

export default class MemoTest extends Component {
  state = {
    title: '123',
    name: 'hello',
    arr: [11, 12, 13]
  }
  componentDidMount() {
    // console.log(A, B)
    const anc = <div>123</div>
    console.log(anc)
    console.log(A, B)
    // console.log(React.isValidElement(anc)) // true
    console.log(React.isValidElement(B)) // false
    console.log(React.isValidElement(<B />)) // true
    // var thisArg = this
    const children = this.props.children

    // children 为元素，数组、null、undefined
    // 如果 children 是一个数组，它将被遍历并为数组中的每个子节点调用该函数。
    // 如果子节点为 null 或是 undefined，则此方法将返回 null 或是 undefined，而不会返回数组
    console.log(children)
    React.Children.map(children, function(thisArg) {
      console.log(thisArg)
    })
    // 返回children 中的组件总数量
    console.log(React.Children.count(children))

    // 验证 children 是否只有一个子节点（一个 React 元素）， 如果有则返回它，否则此方法会抛出错误。
    // console.log(React.Children.only(children))

    // 单个元素时会转换为数组
    // 将 children 这个复杂的数据结构以数组的方式扁平展开并返回，并为每个子节点分配一个 key。
    // 当你想要在渲染函数中操作子节点的集合时，它会非常实用，
    // 特别是当你想要在向下传递 this.props.children 之前对内容重新排序或获取子集时
    console.log(React.Children.toArray(children))
  }
  render() {
    return (
      <div>
        <h3>{this.state.name}</h3>
        <A title={this.state.title} arr={this.state.arr} />
        <B title={this.state.title} arr={this.state.arr} />
        <button
          onClick={() => {
            const arr = this.state.arr
            arr.push(14)
            this.setState({
              arr
            })
            // this.setState({
            //   name: 'world'
            // })
          }}
        >
          测试哦
        </button>
      </div>
    )
  }
}
