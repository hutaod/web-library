import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "antd";

const formItemLayout = {
  wrapperCol: {
    span: 20,
  },
  labelCol: {
    span: 4,
  },
};

class ImageConfig extends Component {
  static propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    data: {
      src: "",
    },
    onChange() {},
  };

  render() {
    return (
      <Fragment>
        <Form.Item {...formItemLayout} required label="图片链接">
          <Button
            onClick={e => {
              this.props.onChange("src", "https://www.qmitan.com/uploads/allimg/190408/4-1Z40Q353034H.jpg");
            }}
          >
            上传图片
          </Button>
        </Form.Item>
      </Fragment>
    );
  }
}

export default ImageConfig;
