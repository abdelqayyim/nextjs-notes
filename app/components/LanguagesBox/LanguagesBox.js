"use client"
import React, { useEffect, useContext, useState } from "react";
import styles from "./LanguagesBox.module.css";

import LanguageButton from "../button/LanguageButton";
import DropArrow from "../DropArrow/DropArrow";
// import { AppProvider, ACTIONS } from "../../app/AppContext";
import AddNoteBtn from "../note/AddNoteBtn";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLanguages } from "../../redux/slice";

const LanguagesBox = (props) => {
  const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
  
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

  if (languages!== null) {
    return (
      <div className={`${styles["top-div"]}`}>
        <div className={`${styles["languages-box"]}`}>
        {languages.map((language) => {
            return (
              <LanguageButton
                name={language.name}
                key={language._id}
                moveUp={props.moveUp}
              />
            );
          })}
          <DropArrow />
        </div>
      </div>
    );
  }
  return (
    <div className={`${styles["top-div"]}`}>
      <div className={`${styles["languages-box"]}`}>
      {/* {languages.map((language) => {
          return (
            <LanguageButton
              name={language.name}
              key={language._id}
              moveUp={props.moveUp}
            />
          );
        })} */}
        <DropArrow />
      </div>
    </div>
  );
  
  
  
};


export default LanguagesBox;
