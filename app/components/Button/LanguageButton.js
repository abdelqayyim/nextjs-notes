import React, { useCallback, useEffect, useState } from "react";
import styles from "./LanguageButton.module.css";
// import { ACTIONS, AppProvider } from "../../app/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentNotes } from "@/app/redux/slice";

const LanguageButton = (props) => {
  // const curr = useContext(AppProvider); // global context
  const router = useRouter();
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.languages.languagesList);
  const currentNotes = useSelector((state) => state.languages.currentNotes);
  const values = useSelector((state) => state.languages.value);
  const [notes, setNotes] = useState(currentNotes);
  let path = props.name.replace(/\s/g, "").toLowerCase();
  

  //find the id
  const findID = () => {
    let id = -1;
    languages.forEach((lang) => {
      if (lang.name.replace(/\s/g, "").toLowerCase() == path) {
        id = lang._id;
      }
    })
    return id;
  }
  const clickHandler = () => {
    let id = findID();
    // fetch the notes for this languages
    // if notes is empty, fetch it from value from original home page fetch
    if (notes.length == 0) {
      let temp = values.filter(obj => {
        if (obj._id == id) {
          return obj.notes;
        }
      })
      dispatch(setCurrentNotes([...temp]));
      router.push(`/${path}`);
    }
  }

  
  //TODO: remove the spaces before passing it to the parameters or else you'll have %

  return (
    <button
      className={styles.btn}
      onClick={clickHandler}
      name={props.name}
      id={props._id}
    >
      {props.name}
    </button>
  );
};

export default LanguageButton;
