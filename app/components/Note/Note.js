import React, { useState } from "react";
import styles from "./Note.module.css";
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNotes,setErrorMessage, setSpinnerMessage,setCurrentNote, setValue} from "@/app/redux/slice";
import Confirmation from "../Confirmation/Confirmation";

const Note = (props) => {
  const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  let globalValue = useSelector((state) => state.languages.value);
  const currentLanguageID = useSelector(state => state.languages.currentLanguageID);
  const [activeConfirmation, setActiveConfirmation] = useState(false);

  const deleteNoteHandler = async () => {
    let note = { _id: props.id, title: props.title, description: props.description, noteDetail: props.detail };
    
    try {
      dispatch(setSpinnerMessage("Deleting Note"));
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
      let tempVal = [...globalValue];
      tempVal = globalValue.map((languageOBJ) => {
        if (languageOBJ._id === currentLanguageID) {
          return { ...languageOBJ, notes: [...newNotes] };
        }
        return languageOBJ;
      })
      dispatch(setValue(tempVal));
      dispatch(setCurrentNotes(newNotes));
      dispatch(setErrorMessage({ message: "Note sucessfully Deleted", sign: "positive" }));
      dispatch(setSpinnerMessage(""));
      return data;
  }
  catch (error) {
      dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
      dispatch(setSpinnerMessage(""));
      throw error;
  }
  }
  const responseHandler = (response) => {
    setActiveConfirmation(false);
    if (response == 'yes') {
      deleteNoteHandler();
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
    <>
      {activeConfirmation && <Confirmation response={ responseHandler} title="Confirm Note Deletion"/>}
      <div className={`${styles["note-info"]}`} onClick={noteHandler}>
      <div className={styles["note-title"]}><span className={styles["custom-bullet"]}></span>{props.title}</div>
      <div className={styles["note-description"]}>{props.description}</div>
        <div className={styles.delete} onClick={(event) => {event.stopPropagation(); setActiveConfirmation(true) }}>
        <span class="material-symbols-outlined">delete</span>
      </div>
    </div>
    </>
  );
};
export default Note;
