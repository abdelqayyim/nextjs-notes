import React, { useState, useContext, useRef } from "react";
import styles from "./InputPopUp.module.css";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { togglePopup } from "../../redux/slice";
// import { IonIcon } from '@ionic/react';
// import { closeOutline } from 'ionicons/icons';
import {addLanguage,deleteLanguage, addNote, fetchLanguages} from "../../redux/slice";

const AddLanguagePopUp = (props) => {
  // used in languagesBox component
  const isOverlayActive = useSelector((state) => state.languages.inputPopup);
  const [inputValue, setInputValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const overlay = useRef();
  const dispatch = useDispatch();
  

  const overlayClickHandler = () => {
    dispatch(togglePopup());
  }
  const submitHandler = (event) => {
    if (props.mode == "Add") {
      dispatch(addLanguage(inputValue)); 
    } else {
      dispatch(deleteLanguage(inputValue));
    }
    dispatch(togglePopup());
  }
  const addNoteHandler = () => {
    let note = {
      title: titleValue,
      description: descriptionValue,
      noteDetail: "",
      _id: ""
    }
    dispatch(addNote(note));
    // setTimeout(() => { 
    //   dispatch(fetchLanguages());
    // },1000)
    dispatch(togglePopup());
  }
  return ReactDOM.createPortal(
    <div ref={overlay} className={styles.overlay} onClick={(event)=>{if (overlay.current == event.target) {
      overlayClickHandler();
    }
    }}>
      {(props.mode == 'add' || props.mode == 'delete') &&
        <div className={styles.popup}>
        <label for="input">{ props.mode} Language</label>
        <input onChange={(event) =>setInputValue(event.target.value)} className={styles.input} type="text" id="input" name="userInput" value={inputValue} />
          <button onClick={submitHandler}>Submit</button>
        </div>
      }
      {props.mode == 'add-note' && 
        <div className={styles.notePopup}>
        <label for="input">Add Note</label>
        <input placeholder="Title" onChange={(event) =>setTitleValue(event.target.value)} className={styles.title} type="text" id="title" name="userInput" value={titleValue} />
        <textarea className={styles.description} onChange={(event) => setDescriptionValue(event.target.value)}></textarea>
          <button onClick={addNoteHandler}>Submit</button>
        </div>
      }
      
    </div>
    ,
    document.querySelector(".overlay")
  );
};

export default AddLanguagePopUp;
