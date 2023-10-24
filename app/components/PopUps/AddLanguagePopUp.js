import React, { useState, useContext, useRef } from "react";
import styles from "./AddLanguagePopUp.module.css";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { togglePopup } from "../../redux/slice";
// import { IonIcon } from '@ionic/react';
// import { closeOutline } from 'ionicons/icons';
import {addLanguage,deleteLanguage} from "../../redux/slice";

const AddLanguagePopUp = (props) => {
  // used in languagesBox component
  const isOverlayActive = useSelector((state) => state.languages.inputPopup);
  const [inputValue, setInputValue] = useState("");
  const overlay = useRef();
  const dispatch = useDispatch();

  const overlayClickHandler = () => {
    dispatch(togglePopup());
  }
  const submitHandler = (event) => {
    if (props.mode == "Add") {
      dispatch(addLanguage(inputValue)); 
    }
    //Call delete
    dispatch(deleteLanguage(inputValue)); 
  }
  return ReactDOM.createPortal(
    <div ref={overlay} className={styles.overlay} onClick={(event)=>{if (overlay.current == event.target) {
      overlayClickHandler();
    }}}>
      <div className={styles.popup}>
          {/* <IonIcon onClick={overlayClickHandler} className={styles["close-btn"]} role="" color="dark" icon={closeOutline} size="medium"></IonIcon> */}
        <label for="input">{ props.mode} Language</label>
        <input onChange={(event) =>setInputValue(event.target.value)} className={styles.input} type="text" id="input" name="userInput" value={inputValue} />
          <button onClick={submitHandler}>Submit</button>
        </div>
    </div>
    
    ,
    document.querySelector(".overlay")
  );
};

export default AddLanguagePopUp;
