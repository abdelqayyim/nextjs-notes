import React, { useContext } from "react";
import styles from "./Note.module.css";
import { ACTIONS, AppProvider } from "../../app/AppContext";
import { TrashOutline } from 'react-ionicons';

const Note = (props) => {
  const deleteNoteHandler = ()=>{
    console.log("pressed");
  }
  const curr = useContext(AppProvider);
  const noteHandler = () => {
    curr.callDispatch({
      type: ACTIONS.CHANGE_CURRENT_NOTE,
      payload: {
        title: props.title,
        description: props.description,
        detail: props.noteDetail,
        id: props.noteId,
        language: props.noteLanguage,
      },
    });
  };
  return (
    <div className={`${styles["note-info"]}`} onClick={noteHandler}>
      <div className={styles["note-title"]}><span className={styles["custom-bullet"]}></span>{props.title}</div>
      <div className={styles["note-description"]}>{props.description}</div>
      <div className={styles.delete} onClick={deleteNoteHandler}><TrashOutline color={'#00000'} title={"trash"}/></div>
    </div>
  );
};
export default Note;
