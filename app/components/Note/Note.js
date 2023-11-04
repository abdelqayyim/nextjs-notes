import React, { useContext } from "react";
import styles from "./Note.module.css";
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNotes} from "@/app/redux/slice";

const Note = (props) => {
  const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const currentLanguageID = useSelector(state => state.languages.currentLanguageID);

  const deleteNoteHandler = async (event) => {
    event.stopPropagation();
    let note = { _id: props.id, title: props.title, description: props.description, noteDetail: props.detail };
    
    try {
      const response = await fetch(URL +`${currentLanguageID}/deleteNote`, {
          method: 'DELETE',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(note),
      })
      const data = await response.json();
      let newNotes = [...data.notes];
      dispatch(setCurrentNotes(newNotes));
      return data;
  }
  catch (error) {
      console.log(error);
      throw error;
  }
  }

  // const curr = useContext(AppProvider);
  const noteHandler = () => {
    // set the current note in the global context
    let note = { _id: props.id, title: props.title, description: props.description, noteDetail: props.detail };
    dispatch(setCurrentNote(note));
    router.push(`${pathname}/${props.id}`);
  };
  
  return (
    <div className={`${styles["note-info"]}`} onClick={noteHandler}>
      <div className={styles["note-title"]}><span className={styles["custom-bullet"]}></span>{props.title}</div>
      <div className={styles["note-description"]}>{props.description}</div>
      <div className={styles.delete} onClick={deleteNoteHandler}>
        <span class="material-symbols-outlined">delete</span>
      </div>
    </div>
  );
};
export default Note;
