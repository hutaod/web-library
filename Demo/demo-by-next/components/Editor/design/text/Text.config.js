import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

const formItemLayout = {
  wrapperCol: {
    span: 20,
  },
  labelCol: {
    span: 4,
  },
};

class TextConfig extends Component {
  static propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    data: {
      text: "",
    },
    onChange() {},
  };

  render() {
    return (
      <Fragment>
        <Form.Item {...formItemLayout} required label="文本信息">
          <Input
            onChange={e => {
              this.props.onChange("text", e.target.value);
            }}
          />
        </Form.Item>
      </Fragment>
    );
  }
}

export default TextConfig;
