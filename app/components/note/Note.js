import React, { useContext } from "react";
import styles from "./Note.module.css";
// import { ACTIONS, AppProvider } from "../../app/AppContext";
// import { IonIcon } from '@ionic/react';
// import { trashOutline } from 'ionicons/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentNote, toggleTakingNote } from "@/app/redux/slice";

const Note = (props) => {
  const state = useSelector((state) => state.languages);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const deleteNoteHandler = ()=>{
    console.log("pressed");
  }
  // const curr = useContext(AppProvider);
  const noteHandler = () => {
    // set the current note in the global context
    let note = { noteID: props.id, noteTitle: props.title, noteDescription: props.description, noteDetail: props.detail };
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
