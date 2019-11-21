import React from 'react'
import Counter from './Counter'

const TestComp = (props) => {
  const { children, color } = props
  console.log(props)

  return (
    <button style={{ color }}>
      {/* <div aria-hiddle={true}>123</div> */}
      {children}
    </button>
  )
}

function App() {
  const but = <TestComp add-aa={123}>hello</TestComp>
  console.log(but.props.children)

  return (
    <div className="App">
      <Counter />
      {but}
    </div>
  )
}

export default App
