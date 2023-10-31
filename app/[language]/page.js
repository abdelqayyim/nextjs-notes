"use client";
import styles from "./layout.module.css";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Note from "../components/Note/Note";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLanguages,
  setCurrentLanguage,
  togglePopup,
} from "../redux/slice";
import { LOADING_STATE } from "../redux/slice";
import Spinner from "../components/Spinner/Spinner";

const Page = (props) => {
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.languages.value);
  let loadingState = useSelector((state) => state.languages.loading);
  const currentParamLang = decodeURIComponent(useParams().language);
  let curr;

  useEffect(() => {
    if (languages.length === 0) {
      // Dispatch the action to fetch languages when the component mounts
      dispatch(fetchLanguages());
    }
  }, [dispatch, languages]);

  for (let language of languages) {
    if (language.name.replace(/\s/g, "") == currentParamLang) {
      curr = language._id;
      dispatch(setCurrentLanguage(language._id));
      break;
    }
  }

  let notes = [];
  let langObject = languages.filter((language) => {
    if (language._id == curr) {
      notes = language.notes;
      return language;
    }
  });
  const addNoteHandler = () => {
    dispatch(togglePopup());
  };

  if (loadingState == LOADING_STATE.LOADING) {
    return <Spinner message={"Loading Notes"} />;
  }

  return (
    <div className={styles["main-div"]}>
      <div className={styles["detail-div"]}>INfo</div>
      <div className={styles["extras-div"]}>
        <div onClick={addNoteHandler}>Add Note</div>
      </div>
      <div className={styles["notes-div-parent"]}>
        <div className={styles["notes-div-child"]}>
          <div className={styles["notes-div-child"]}>
            {notes.length == 0 && <div style={{color: "white"}}>No notes for this language yet</div>}
            {(notes != undefined && notes.length > 0)&&
              [...notes].reverse().map((note) => (
                <Note
                  detail={note.noteDetail}
                  title={note.title}
                  description={note.description}
                  id={note._id}
                  key={note._id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
