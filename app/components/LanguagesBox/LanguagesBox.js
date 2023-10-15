"use client"
import React, { useEffect, useContext, useState } from "react";
import styles from "./LanguagesBox.module.css";

import LanguageButton from "../button/LanguageButton";
import DropArrow from "../DropArrow/DropArrow";
// import { AppProvider, ACTIONS } from "../../app/AppContext";
import AddNoteBtn from "../note/AddNoteBtn";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLanguages, setCurrentLanguage, togglePopup } from "../../redux/slice";
import { LOADING_STATE } from "../../redux/slice";
import AddLanguagePopUp from "../PopUps/AddLanguagePopUp";

const LanguagesBox = (props) => {
  let state = useSelector((state) => state.languages);
  const isOverlayActive = useSelector((state) => state.languages.inputPopup);
  const [mode, setMode] = useState(""); //this is for whether a language is being added or deleted
  let loadingState = state.loading;
  let popupActive = state.inputPopup;
  
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch the action to fetch languages when the component mounts
    dispatch(fetchLanguages());
  }, [dispatch]);
  
  const languages = useSelector((state) => state.languages.value);

  function titleCase(str) {
    
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  const languageButtonHandler = (id) => {
    dispatch(setCurrentLanguage(id));
  }

  const changeMode = (newMode) => {
    setMode(newMode);
  }
  
  
  if (languages!== null || languages !== undefined) {
    return (
      <div className={`${styles["top-div"]} ${isOverlayActive? styles["overlay-active"]:""}`}>
        <div className={`${styles["languages-box"]}`}>
        {languages.map((language) => {
            return (
              <LanguageButton
                name={language.name}
                key={language._id}
                moveUp={props.moveUp}
                clicked={()=>languageButtonHandler(language._id)}
              />
            );
          })}
          {loadingState == LOADING_STATE.IDLE && <DropArrow mode={changeMode} />}
        </div>
        {popupActive && <AddLanguagePopUp mode={ mode} />}
      </div>
    );
  }
  return (
    <div className={`${styles["top-div"]}`}>
      <div className={`${styles["languages-box"]}`}>
      </div>
    </div>
  );
  
  
  
};


export default LanguagesBox;
