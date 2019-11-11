import React, { Component } from "react";
import { Row, Col, Layout } from "antd";
import "./styles.less";

const { Header, Content, Sider } = Layout;

export default class skuTest extends Component {
  state = {
    chooseSkuList: [],
    choosePropsMap: {}
  };

  renderCompList() {
    return <Sider>Sider</Sider>;
  }

  renderEditDetail() {
    return <Sider>Edit</Sider>;
  }

  renderContent() {
    return (
      <Content>
        <div>123</div>
      </Content>
    );
  }

  render() {
    return (
      <div className="edit_layout ">
        <h3>自定页面</h3>
        <Row>
          <Layout>
            <Header>hello</Header>
            <Layout>
              {this.renderCompList()}
              {this.renderContent()}
              {this.renderEditDetail()}
            </Layout>
          </Layout>
        </Row>
      </div>
    );
  }
}
