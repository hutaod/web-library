// import concat from "lodash/concat";
import Link from "next/link";
import Router, { withRouter } from "next/router";

export default () => (
  <div>
    <div>Welcome to nextjs</div>
    <p>scoped!</p>
    Click{" "}
    <Link href="/test">
      <a>to Test</a>
    </Link>
    <button
      onClick={() => {
        Router.push("/?counter=10", "/test?counter=10", {
          shallow: true
        });
      }}
    >
      测试
    </button>
    <style jsx>{`
      p {
        color: blue;
      }
    `}</style>
    <style global jsx>{`
      body {
        background: yellow;
      }
    `}</style>
  </div>
);
