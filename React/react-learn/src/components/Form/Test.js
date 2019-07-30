import React, { Component } from 'react'
import { Input, Button } from 'antd'
import Form from './Form'

const FormItem = Form.Item

@Form.create()
class Test extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log(err, values)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="用户名"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 10 }}
        >
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '用户名错误'
              }
            ]
          })(<Input />)}
        </FormItem>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: '密码错误'
            }
          ]
        })(<Input type="password" />)}
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form>
    )
  }
}

export default Test
