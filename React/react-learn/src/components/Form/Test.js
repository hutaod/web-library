import React, { Component } from 'react'
import { Input, Button } from 'antd'

// 创建高阶函数
function FormCreate(Comp) {
  return class extends Component {
    render() {
      return <Comp {...this.props} />
    }
  }
}

@FormCreate
class Test extends Component {
  handleLogin = () => {}

  render() {
    return (
      <div>
        <Input />
        <Input type="password" />
        <Button onClick={this.handleLogin}>登录</Button>
      </div>
    )
  }
}

export default Test
