import React, { memo } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

function TextView({ data }) {
  return <div className={styles.designText}>{data.text}</div>;
}

TextView.propTypes = {
  data: PropTypes.object,
};

TextView.defaultProps = {
  data: {
    text: "",
  },
};

export default memo(TextView);
