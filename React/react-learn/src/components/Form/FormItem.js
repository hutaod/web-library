import React, { Component } from 'react'
import { Row, Col } from 'antd'

class FormItem extends Component {
  static defaultProps = {
    labelCol: {
      span: 0
    },
    wrapperCol: {},
    label: '',
    error: ''
  }
  render() {
    const { labelCol, wrapperCol, label, children, error } = this.props
    return (
      <Row>
        {label && (
          <Col
            {...labelCol}
            style={{
              textAlign: 'right',
              flex: '0 0 auto'
            }}
          >
            <label
              style={{
                display: 'inline-block',
                verticalAlign: 'middle'
              }}
            >
              {label}
            </label>
          </Col>
        )}
        <Col {...wrapperCol}>
          <span>{children}</span>
          {error && <div style={{ color: '#f5222d' }}>{error}</div>}
        </Col>
      </Row>
    )
  }
}

export default FormItem
