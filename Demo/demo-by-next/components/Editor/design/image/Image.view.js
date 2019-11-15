import React, { memo } from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

function ImageView({ data }) {
  return (
    <div className={styles.designImage}>
      {data.src ? (
        <img src={data.src} className={styles.img} />
      ) : (
        <div className={styles.textMsg}>点击编辑图片组件</div>
      )}
      {data.hotAreas
        ? data.hotAreas.map(area => (
            <div
              className={styles.hotArea}
              style={{
                width: area.hotSpotWidth * 2 + "%",
                height: area.hotSpotHeight * 4 + "%",
                left: area.hotSpotX * 2 + "%",
                top: area.hotSpotY * 4 + "%",
              }}
              key={area.componentId}
            />
          ))
        : null}
    </div>
  );
}

ImageView.propTypes = {
  data: PropTypes.object,
};

ImageView.defaultProps = {
  data: {
    src: "",
    hotAreas: [],
  },
};

export default memo(ImageView);
