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
    // setTimeout(() => {
    //   dispatch(fetchLanguages());
    // },2000)
    dispatch(togglePopup());
  }
  return ReactDOM.createPortal(
    <div ref={overlay} className={styles.overlay} onClick={(event)=>{if (overlay.current == event.target) {
      overlayClickHandler();
    }
    }}>
      {(props.mode == 'Add' || props.mode == 'Delete') &&
        <div className={styles.popup}>
        <label for="input">{ props.mode} Language</label>
        <input onChange={(event) =>setInputValue(event.target.value)} className={styles.input} type="text" id="input" name="userInput" value={inputValue} />
          <button onClick={submitHandler}>Submit</button>
        </div>
      }
    </div>
    ,
    document.querySelector(".overlay")
  );
};

export default AddLanguagePopUp;
