import React, { Component } from 'react'
import FormItem from './FormItem'

class Form extends Component {
  state = {}
  static Item = FormItem
  static create = () => {
    // const that = this
    return Comp => {
      return class extends Component {
        constructor(props) {
          super(props)
          this.options = {}
          this.state = {}
        }

        validateFields = cb => {
          const ret = Object.keys(this.options).every(field => {
            return this.validateField(field).pass
          })
          cb(ret, this.state)
        }

        validateField = field => {
          if (!this.options[field]) {
            return {
              pass: true
            }
          }
          const rules = this.options[field].rules
          const ret = rules.find(rule => {
            if (rule.required) {
              if (!this.state[field]) {
                // 校验失败时的错误信息
                this.setState({
                  [field + 'Message']: rule.message
                })
                return true
              }
            }
            return false
          })

          if (!ret) {
            // 校验成功时的错误信息
            this.setState({
              [field + 'Message']: ''
            })
          }

          return {
            pass: !ret,
            rule: ret
          }
        }

        onChange = (e, field) => {
          if (e.target.nodeName === 'INPUT') {
            this.setState(
              {
                [field]: e.target.value
              },
              () => this.validateField(field)
            )
          }
        }

        getFieldDecorator = (field, option) => {
          this.options[field] = option
          return Comp => (
            <div>
              {React.cloneElement(Comp, {
                name: field,
                value: this.state[field],
                onChange: e => this.onChange(e, field)
              })}
              {/* 添加一个校验提示信息 */}
              {this.state[field + 'Message'] && (
                <p style={{ color: 'red' }}>{this.state[field + 'Message']}</p>
              )}
            </div>
          )
        }

        render() {
          return (
            <Comp
              {...this.props}
              form={{
                validateFields: this.validateFields,
                getFieldDecorator: this.getFieldDecorator
              }}
            />
          )
        }
      }
    }
  }

  render() {
    return <form {...this.props}>{this.props.children}</form>
  }
}

export default Form
