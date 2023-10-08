import React, { useState, useRef, useContext } from "react";
import styles from "./AddNotePopUp.module.css";
import ReactDOM from "react-dom";
import { ACTIONS, AppProvider } from "../../app/AppContext";

const AddNotePopUp = (props) => {
  const curr = useContext(AppProvider);
  const [overlayClicked, setOverlayClicked] = useState(false);
  let overlay = useRef();
  let newTitle = useRef();
  let newDescription = useRef();
  const overlayHandler = () => {
    curr.callDispatch({ type: ACTIONS.TOGGLE_ADD_NOTE_POPUP });
  };
  const addNewNoteHandler = () => {
    let title = newTitle.current.value.trim();
    let description = newDescription.current.value.trim();
    if (title.length === 0) {
      curr.callDispatch({
        type: ACTIONS.SHOW_INPUT_RESPONSE,
        payload: {
          isErrorInput: true,
          errorType: "negative",
          message: `Title Cannot be Blank`,
        },
      });
      setTimeout(() => {
        curr.callDispatch({
          type: ACTIONS.SHOW_INPUT_RESPONSE,
          payload: {
            isErrorInput: false,
            errorType: "negative",
            message: `Title Cannot be Blank`,
          },
        });
      }, 2000);
      return;
    }
    let newNote = {
      title: title,
      description: description,
      noteDetail: "",
      _id: 0,
    };
    curr.addNote(curr.currentLanguage, newNote);
  };
  const enterKeyPress = (key) => {
    console.log(key.code === "Enter");
    if (key.code === "Enter") {
      addNewNoteHandler();
    }
  };

  return ReactDOM.createPortal(
    <div className="newNote-container" onKeyPress={enterKeyPress}>
      <div
        className={overlayClicked ? "overlay" : "overlay active"}
        ref={overlay}
        onClick={overlayHandler}
      ></div>
      <div
        className={overlayClicked ? "newNote-popup" : "newNote-popup active"}
      >
        <input
          placeholder="Title"
          className="newNote-title"
          ref={newTitle}
          autoFocus="true"
        ></input>
        {/* <input placeholder='Description' className='newNote-description'></input> */}
        <textarea
          className="newNote-description"
          placeholder="Description"
          ref={newDescription}
        ></textarea>
        <button className="newNote-btn" onClick={addNewNoteHandler}>
          ADD
        </button>
      </div>
    </div>,
    document.querySelector(".overlay")
  );
};

export default AddNotePopUp;
