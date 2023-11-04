"use client";
import styles from "./layout.module.css";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Note from "../components/Note/Note";
import { useSelector, useDispatch } from "react-redux";
import {
  setValue,
  setlanguagesList,
  setCurrentLanguage,
  setCurrentNotes,
  togglePopup
} from "../redux/slice";
import Spinner from "../components/Spinner/Spinner";

const Page = (props) => {
  const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
  const dispatch = useDispatch();
  const globalLanguage = useSelector((state) => state.languages.currentLanguageID);
  const globalNotes = useSelector((state) => state.languages.currentNotes);
  const languageName = useParams().language.toLowerCase();
  const [notes, setNotes] = useState(globalNotes);

  
  useEffect(() => {
    setNotes(globalNotes);
  },[globalNotes])

  useEffect(() => {
    if (globalLanguage == "") {
      const fetchData = async () => {
        try {
          const response = await fetch(URL, {
              method: 'GET',
              headers: {
                  'Accept': 'application/json'
              }
          });
          const data = await response.json();
          let formattedData = data.map(obj => ({ _id: obj._id, name: obj.name }));
          dispatch(setValue([...data]));
          dispatch(setlanguagesList(formattedData));
          let newID;
          let temp = [...data];
          let newNotes = [];

          for (let i = 0; i < data.length; i++) {
            if (data[i].name.replace(/\s/g, "").toLowerCase() == languageName) {
              newID = data[i]._id;
              newNotes = [...data[i].notes].reverse();
            }
          }
          dispatch(setCurrentLanguage(newID));
          dispatch(setCurrentNotes(newNotes));
          return data;
        } catch (error) {
          throw error;
      }
      } 
      fetchData()
    }
  },[globalLanguage])


  const addNoteHandler = ()=>{
    dispatch(togglePopup());
  }

  

  // if (active) {
  //   return <Spinner/>;
  // }

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
              notes.map((note) => {
                return  <Note
                detail={note.noteDetail}
                title={note.title}
                description={note.description}
                id={note._id}
                key={note._id}
              />
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
