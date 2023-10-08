import React, { useContext } from "react";
import styles from "./ToggleMode.module.css";
import { AppProvider, ACTIONS } from "../../app/AppContext";

const ToggleMode = (props) => {
  const curr = useContext(AppProvider);
  const toggleMode = () => {
    curr.callDispatch({ type: ACTIONS.TOGGLE_APP_MODE });
    document.querySelector(".check").classList.toggle("dark");
    props.toggleMode();
  };
  return (
    <div
      className={`toggle-container ${curr.currentAppMode}`}
      onClick={toggleMode}
    >
      {/* <input type='checkbox' /> */}
      <span className="check"></span>
    </div>
  );
};

export default ToggleMode;
