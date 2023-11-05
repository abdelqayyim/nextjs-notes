"use client";
import React, { useEffect, useContext, useState } from "react";
import styles from "./LanguagesBox.module.css";
import LanguageButton from "../Button/LanguageButton";
import DropArrow from "../DropArrow/DropArrow";
import { useSelector, useDispatch } from "react-redux";
import {
  setValue,
  setCurrentLanguage,
  setSpinnerMessage,
  setErrorMessage,
  setlanguagesList
} from "../../redux/slice";
import { LOADING_STATE } from "../../redux/slice";
import InputPopUp from "../PopUps/InputPopUp";

const LanguagesBox = (props) => {
  const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
  let state = useSelector((state) => state.languages);
  const dispatch = useDispatch();
  const loadingState = state.loading;
  const isOverlayActive = useSelector((state) => state.languages.inputPopup);
  const [mode, setMode] = useState(""); //this is for whether a language is being added or deleted
  let popupActive = state.inputPopup;
  const currentLanguages = useSelector((state) => state.languages.languagesList);
  const [currList, setCurrList] = useState(currentLanguages);

  useEffect(() => {
    setCurrList(currentLanguages);
  }, [currentLanguages])


  //fetch the languages
  useEffect(() => {
    if (currList.length == 0) {
      const fetchData = async () => {
        dispatch(setSpinnerMessage("Loading Languages"));
        try {
          const response = await fetch(URL, {
              method: 'GET',
              headers: {
                  'Accept': 'application/json'
              }
          });
          const data = await response.json();
          dispatch(setSpinnerMessage(""));
          let formattedData = data.map(obj => ({ _id: obj._id, name: obj.name }));
          dispatch(setlanguagesList(formattedData));
          dispatch(setValue(data))
          return data;
        } catch (error) {
          dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
          dispatch(setSpinnerMessage(""));
          throw error;
      }
      } 
      fetchData()
    }
  }, [currList])
  //check to see if languages are already loading

  
  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  const languageButtonHandler = (id) => {
    dispatch(setCurrentLanguage(id));
    // dispatch(viewingNotes(true));
  };

  const changeMode = (newMode) => {
    setMode(newMode); // for input or deletion of language
  };



  if (currList.length > 0) {
    return (
      <div
        className={`${styles["top-div"]} ${
          isOverlayActive ? styles["overlay-active"] : ""
        }`}
      >
        {loadingState == LOADING_STATE.IDLE && (
          <div className={styles["typewriter"]}>
            <h1>My Notes</h1>
          </div>
        )}
        <div className={`${styles["languages-box"]}`}>
          {[...currList].reverse().map((language) => {
            return (
              <LanguageButton
                name={toTitleCase(language.name)}
                key={language._id}
                clicked={() => languageButtonHandler(language._id)}
              />
            );
          })}
          <DropArrow mode={changeMode} />
        </div>
        {popupActive && <InputPopUp mode={mode} />}
      </div>
    );
  }
  return (
    <div className={`${styles["top-div"]}`}>
      <div className={`${styles["languages-box"]}`}></div>
    </div>
  );
};

export default LanguagesBox;
