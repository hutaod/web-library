import React from 'react'
import ReactDOM from 'react-dom'
import Counter from './Counter'
import Portal from './components/Portal'
import Tabs from './components/Tabs'
import TestImmutable from './TestImmutable'
import TestAnimate from './TestAnimate'

class ClsCmp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0
    }
    console.log('ClsCmp', 11)
  }
  componentDidMount() {
    console.log('ClsCmp', 12)
  }
  componentWillUnmount() {
    console.log('ClsCmp', 13)
  }
  render() {
    console.log('ClsCmp', 14)
    return (
      <div
        onClick={() => {
          this.setState({ counter: this.state.counter + 1 })
        }}
      >
        {this.state.counter}123
      </div>
    )
  }
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Comp'
}

const wapperComp = (Comp) => {
  class Hoc extends Comp {
    // constructor(props) {
    //   super(props) // 才会执行Comp的生命周期函数
    //   console.log('ClsCmp', 1)
    // }
    // 如果写了就不会执行Comp的componentDidMount函数
    // componentDidMount() {
    //   console.log('ClsCmp', 2)
    //   super.componentDidMount()
    // }
    // 同上
    // componentWillUnmount() {
    //   console.log('ClsCmp', 3)
    // }
    render() {
      console.log('ClsCmp', 4)
      const elementsTree = super.render()
      console.log(elementsTree)
      const props = Object.assign({}, elementsTree.props, { aac: '哈喽' })
      console.log(props)
      // 这样添加的props不会出现在组件的props上，在Comp内部获取不到
      const newElementsTree = React.cloneElement(
        elementsTree,
        props,
        elementsTree.props.children
      )
      return newElementsTree
    }
  }
  Hoc.displayName = `Hoc(${getDisplayName(Comp)})`
  return Hoc
}

const ClsCmp2 = wapperComp(ClsCmp)

class App extends React.Component {
  constructor(props) {
    super(props)
    console.log(111)
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(1112)
  //   return {}
  // }

  componentDidMount() {
    console.log(1114)
    const myPortal = this.myPortal
    // console.log(myPortal, myPortal.openPortal())
    console.log(myPortal)
    setTimeout(() => {
      console.log(999, ReactDOM.findDOMNode(this.myPortal))
    }, 1000)
  }

  // props或state更新时出发，forceUpdate强制刷新会跳过改步骤
  shouldComponentUpdate() {
    console.log(1115)
    return true
  }

  // 在render之后，componentDidUpdate之前
  getSnapshotBeforeUpdate = (prevProps, prevState) => {
    console.log(1116)
    return null
  }

  componentDidUpdate() {
    console.log(1117)
  }

  componentWillUnmount() {
    console.log(1118)
  }

  handClick() {
    console.log(this)
  }

  render() {
    console.log(1113)
    const but = (
      <TestImmutable add-aa={123}>
        <div>hello</div>
        <div>{[1, 2, 3].filter((item) => item !== 1)}</div>
      </TestImmutable>
    )
    console.log(but.props.children)
    window.reactaa = React
    return (
      <div className="App">
        <Counter />
        {but}
        <div dd="dd" dataa-id="aaa">
          heihei&copy;©
        </div>
        <Portal ref={(ref) => (this.myPortal = ref)}>
          <div>123</div>
        </Portal>
        {/* <ClsCmp></ClsCmp> */}
        <ClsCmp2></ClsCmp2>
        <Tabs defaultActiveIndex={0}>
          <Tabs.TabPane tab="123" order="0">
            111
          </Tabs.TabPane>
          <Tabs.TabPane tab="234" order="1">
            222
          </Tabs.TabPane>
        </Tabs>
        <TestAnimate />
      </div>
    )
  }
}

export default App
