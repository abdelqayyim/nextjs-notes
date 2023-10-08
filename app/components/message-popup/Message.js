import React from "react";
import ReactDOM from "react-dom";
import styles from "./Message.module.css";
import * as SVGLoaders from "svg-loaders-react";

const Message = (props) => {
  return ReactDOM.createPortal(
    <div className={`${styles.overlay} ${styles.active}`}>
      <div className={ styles["loader-popup"]}>
        <SVGLoaders.TailSpin className={styles.loader} />
        <p>{props.message}</p>
      </div>
    </div>,
    document.querySelector(".overlay")
  );
};
// spinner options [Audio, BallTriangle, Bars, Circles, Grid, Hearts, Oval, Puff, Rings, SpinningCircles, TailSpin, Threedots]

export default Message;
