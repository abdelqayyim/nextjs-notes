import React, { useContext } from "react";
import styles from "./Background.module.css";

import { ACTIONS, AppProvider } from "./AppContext";

const Background = (props) => {
  const curr = useContext(AppProvider);

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
