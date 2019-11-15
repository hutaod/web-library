import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { compsConfig } from "./config";

const ComponentList = props => {
  return (
    <Fragment>
      <div style={{ fontWeight: "bold" }}>组件列表</div>
      <Row style={{ marginTop: 8 }} gutter={16}>
        {compsConfig.map(item => (
          <Col key={item.type} span={8}>
            <Button
              type="dashed"
              block
              onClick={() => {
                props.onClick(item.type);
              }}
            >
              {item.name}
            </Button>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

ComponentList.propTypes = {
  onClick: PropTypes.func,
};

export default ComponentList;
