import React from "react";
import App from "next/app";
import "./style.less";

class MyApp extends App {
  render() {
    console.log(123);

    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
