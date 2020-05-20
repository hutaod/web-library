// import React from 'react'
import React from '../../hreact/react'

/**
 * children 可以是任何表达式
 * 1. jsx
 * 2. 各种数据类型以及js表达式
 */
const TestChildren = ({ children }) => {
  // console.log(Array.isArray(children), children)
  // // console.log(children.map((item) => item))
  // console.log(
  //   React.Children.map(children, item => {
  //     console.log('item', item)
  //     return item
  //   })
  // )
  // console.log(React.Children.count(children))

  return (
    <div>
      <h2>测试`React.Children`函数</h2>
      {/* {children} */}
    </div>
  )
}

export default TestChildren
