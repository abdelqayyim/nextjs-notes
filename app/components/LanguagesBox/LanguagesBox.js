import React, { useEffect, useContext } from "react";
import styles from "./LanguagesBox.module.css";

import LanguageButton from "../button/LanguageButton";
import DropArrow from "../DropArrow/DropArrow";
import { AppProvider, ACTIONS } from "../../app/AppContext";
import AddNoteBtn from "../note/AddNoteBtn";

const LanguagesBox = (props) => {
  const curr = useContext(AppProvider);

  useEffect(() => {
    curr.fetchLanguages();
  }, []);

  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  return (
    <div className={`${styles["top-div"]}`}>
      <div className={`${styles["languages-box"]}`}>
        {curr.currentLanguages.map((language) => {
          return (
            <LanguageButton
              name={titleCase(language.name)}
              key={language._id}
              moveUp={props.moveUp}
            />
          );
        })}
        <DropArrow />
      </div>
      {curr.currentLanguage !== undefined &&
        curr.currentNote.noteTitle === undefined && <AddNoteBtn />}
    </div>
  );
};

export default LanguagesBox;
