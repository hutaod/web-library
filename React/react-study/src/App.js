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

function App() {
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

export default App
