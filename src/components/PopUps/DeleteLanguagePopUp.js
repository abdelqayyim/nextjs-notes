import React, { useState, useRef, useContext } from "react";
import styles from "./DeleteLanguagePopUp.module.css";
import { ACTIONS, AppProvider } from "../../app/AppContext";
import ReactDOM from "react-dom";

const DeleteLanguagePopUp = (props) => {
  const curr = useContext(AppProvider);
  const inputName = useRef();

  let overlay = useRef();
  const [overlayClicked, setOverlayClicked] = useState(false);

  const overlayHandler = () => {
    curr.callDispatch({ type: ACTIONS.TOGGLE_DELETE_LANGUAGE_POPUP });
    setOverlayClicked(true);
  };

  const deleteLanguage = () => {
    let input = inputName.current.value.trim();
    if (input.length === 0) {
      curr.callDispatch({
        type: ACTIONS.SHOW_INPUT_RESPONSE,
        payload: {
          isErrorInput: true,
          errorType: "negative",
          message: `Input Field Cannot be Empty`,
        },
      });
      setTimeout(() => {
        curr.callDispatch({
          type: ACTIONS.SHOW_INPUT_RESPONSE,
          payload: {
            isErrorInput: false,
            errorType: "negative",
            message: `Input Field Cannot be Empty`,
          },
        });
      }, 2000);
      return;
    }
    curr.deleteLanguage(input);
    setTimeout(() => {
      if (input === curr.currentLanguage) {
        document.querySelector(".my-cs-notes").click(); //return to main page
      }
    }, 500);
  };

  const enterKeyPress = (key) => {
    if (key.code === "Enter") {
      deleteLanguage();
    }
  };

  return ReactDOM.createPortal(
    <div className="delete-overlay-container" onKeyPress={enterKeyPress}>
      <div
        className={overlayClicked ? "delete-overlay" : "delete-overlay active"}
        ref={overlay}
        onClick={overlayHandler}
      ></div>
      <div
        className={
          overlayClicked
            ? "deletelanguage-popup"
            : "deletelanguage-popup active"
        }
      >
        <input
          placeholder="Name"
          className="deleteLang-input"
          ref={inputName}
          autoFocus="true"
        ></input>
        <button className="delete-btn" onClick={deleteLanguage}>
          Delete
        </button>
      </div>
    </div>,
    document.querySelector(".overlay")
  );
};

export default DeleteLanguagePopUp;
