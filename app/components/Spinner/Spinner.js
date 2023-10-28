import React from "react";
import ReactDOM from "react-dom";
import styles from "./Spinner.module.css";
// import * as SVGLoaders from "svg-loaders-react";
import { Orbit } from '@uiball/loaders';

const Message = (props) => {
  return ReactDOM.createPortal(
    <div className={`${styles.overlay} ${styles.active}`}>
      <div className={ styles["loader-popup"]}>
      <Orbit size={35} color="white" />
        <p>{props.message}</p>
      </div>
    </div>,
    document.querySelector(".overlay")
  );
};
// spinner options [Audio, BallTriangle, Bars, Circles, Grid, Hearts, Oval, Puff, Rings, SpinningCircles, TailSpin, Threedots]

export default Message;
