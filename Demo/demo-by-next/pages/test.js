import React, { Component } from "react";
import Router, { withRouter } from "next/router";

class Test extends Component {
  static async getInitialProps(ctx) {
    // console.log(ctx);
    const { req, pathname, query, asPath, jsonPageRes } = ctx;
    console.log("pathname", pathname);
    console.log("query", query);
    console.log(asPath, jsonPageRes);
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    return { userAgent };
  }

  componentDidMount() {
    console.log(1);
  }

  componentDidUpdate() {
    const { pathname, query } = this.props.router;
    console.log(pathname, query);
    // console.log(this.props);
  }

  render() {
    return (
      <div>
        <div>Hello World! {this.props.userAgent}</div>
        <div
          onClick={() => {
            Router.push("/test?counter=10", "/test?counter=10", {
              shallow: true
            });
          }}
        >
          测试浅层路由
        </div>
      </div>
    );
  }
}

export default withRouter(Test);
