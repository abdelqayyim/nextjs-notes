import React, { useRef, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./ChangeNoteLang.module.css";
import { AppProvider } from "../../app/AppContext";

const ChangeNoteLang = (props) => {
  const curr = useContext(AppProvider);
  let noteLang = useRef();
  const clickHandler = () => {
    if (noteLang.current.value.length !== 0) {
      props.saveChange(noteLang.current.value);
    }
  };

  return ReactDOM.createPortal(
    <div className="parent-div">
      <div className="over" onClick={props.closePop}></div>
      <div className="change-pop">
        <input className="newLang-input" ref={noteLang}></input>
        <button className="newLang-btn" onClick={clickHandler}>
          Change
        </button>
      </div>
    </div>,
    document.querySelector(".overlay")
  );
};

export default ChangeNoteLang;
