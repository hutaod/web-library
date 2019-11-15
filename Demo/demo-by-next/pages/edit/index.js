import React, { Component } from "react";
import { Card } from "antd";
import Editor from "../../components/Editor";
import "./styles.less";

export default class skuTest extends Component {
  state = {
    chooseSkuList: [],
    choosePropsMap: {}
  };

  render() {
    return (
      <div className="edit_layout ">
        <h3>自定页面</h3>
        <Card title="商品自定义详情">
          <Editor />
        </Card>
      </div>
    );
  }
}
