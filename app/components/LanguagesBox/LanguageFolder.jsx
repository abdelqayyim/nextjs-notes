import React, { useCallback, useEffect, useState } from "react";
import styles from "./LanguageFolder.module.css"
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
    setValue,
    setCurrentLanguage,
    setSpinnerMessage,
    setErrorMessage,
    setlanguagesList,
    setCurrentNotes
  } from "../../redux/slice";
const LanguageFolder = (props) => {
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
    const clickHandler = (id) => {
        dispatch(setCurrentLanguage(id));
        router.push(`/${path}`);
    }
    
    return (
        <div className={styles["folder-div"]} onClick={()=>clickHandler(props.id)}>
            <div class={styles["back-folder-part"]}></div>
            <div class={styles["main-folder-part"]}>
                {props.name}
            </div>
            {/* <div class={styles["add-icon"]}></div> */}
        </div>
    )
}
export default LanguageFolder;