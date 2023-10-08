import React, { useContext, useState, useRef } from "react";
import styles from "./NoteSuggestion.module.css";
import { AppProvider } from "../../app/AppContext";
import Note from "../note/Note";

const NoteSuggestion = (props) => {
  const curr = useContext(AppProvider);
  const changeNote = (e) => {
    console.log(e);
  };
  return (
    <div className="note-suggestion" onClick={props.onChange}>
      {props.notes.map((note) => {
        if (note._id !== curr.currentNote.noteID) {
          return (
            <Note
              title={note.title}
              description={note.description}
              noteId={note._id}
              key={note._id}
              noteDetail={note.noteDetail}
              noteLanguage={note.noteLanguage}
            />
          );
        }
      })}
    </div>
  );
};

export default NoteSuggestion;
