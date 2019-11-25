import React from 'react'
import Counter from './Counter'

const TestComp = (props) => {
  const { children, color } = props
  console.log(props.children)

  return (
    <button style={{ color }}>
      {/* <div aria-hiddle={true}>123</div> */}
      {children}
    </button>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    console.log(111)
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(1112)

    return null
  }

  componentDidMount() {
    console.log(1114)
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

  render() {
    console.log(1113)
    const but = (
      <TestComp add-aa={123}>
        <div>hello</div>
        <div>{[1, 2, 3].filter((item) => item !== 1)}</div>
      </TestComp>
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
      </div>
    )
  }
}

export default App
