import React, { useContext } from "react";
import styles from "./Background.module.css";

const Background = (props) => {
  return (
    <div
      className={`${styles.background} ${
        props.move == true ? styles["move-up"] : ""
      }`}
    >
      {props.children}
    </div>
  );
};

export default Background;
