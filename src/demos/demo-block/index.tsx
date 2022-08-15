import React, { FC, ReactNode } from "react";

import styles from "./index.less";

interface Props {
  title: string;
  padding?: string;
  border?: string;
  background?: string;
  children: ReactNode;
}

export const DemoBlock: FC<Props> = (props) => {
  return (
    <div className={styles.demoBlock}>
      <div className={styles.title}>{props.title}</div>
      <div
        className={styles.main}
        style={{
          padding: props.padding,
          background: props.background,
          border: props.border,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

DemoBlock.defaultProps = {
  padding: "12px 12px",
  background: "#ffffff",
};
