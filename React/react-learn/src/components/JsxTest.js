import React, { Component } from 'react'
import logo from '../logo.svg'
import styles from '../index.module.css'

// React类负责逻辑控制，比如修改数据 => vdom
// ReactDOM类负责渲染，vdom => dom
// babel-loader可以转换jsx -> vdom,
// <h1>React真帅</h1> => React.createElement('h1', null, 'React真帅')
export default class JsxTest extends Component {
  render() {
    const arr = [1, 2, 3]
    return (
      <div>
        <h1>React真帅</h1>
        <div>{arr}</div>
        <img src={logo} alt="" className={styles.img} />
      </div>
    )
  }
}
