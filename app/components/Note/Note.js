import React, { useState, useRef } from "react";
import styles from "./Note.module.css";
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNotes,setErrorMessage, setSpinnerMessage,setCurrentNote, setValue} from "@/app/redux/slice";
import { Row } from "react-bootstrap";
import MoreButton from "../MoreButton/MoreButton";
import Confirmation from '../PopUps/Confirmation';
import LanguageServices from '@/app/LanguageServices.js'

const Note = (props) => {
  const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  let globalValue = useSelector((state) => state.languages.value);
  const currentLanguageID = useSelector(state => state.languages.currentLanguageID);
  const [activeConfirmation, setActiveConfirmation] = useState(false);
  let note = { _id: props.id, title: props.title, description: props.description, noteDetail: props.detail };
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const deleteNoteHandler = async () => {
    
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
  const handleEditNote = () => {
    console.log("Should edit note", note);
  }
  const handleDeleteNote = async () => {
    try{
      const response = await LanguageServices.deleteNote({note_id: props.id, language_id: currentLanguageID})
      console.log("response", response);
    }catch(error){
      console.log("Error", error);
      throw error;
    }finally{
      setOpenConfirmation(false);
      props.refetch();
    }
  }
  let noteMenuItems = [
    { child: "Edit", onAction: () => handleEditNote() },
    { child: "Delete", onAction:()=>{setWarningMessage("Are you sure you want to delete the note? You cannot undo this action.");
    setOpenConfirmation(true);}},
  ]
  function formatDate(dateString) {
    const date = new Date(dateString);
  
    // Use toLocaleDateString with options for month abbreviation, day, and year
    return date.toLocaleDateString('en-US', {
      month: 'short',  // 'Nov'
      day: '2-digit',  // '03'
      year: 'numeric'  // '2024'
    });
  }
  
  return (
    <div
      style={{ position: "relative", padding: "5px", borderRadius: "10px", backgroundColor: "#D9D9D9", width: "260px", height: "280px", display: "flex", flexDirection: "column", marginRight: "10px", marginTop: "10px", alignItems: "center" }}
    >
      <Row style={{width:"100%", height:"35px", display:"flex", flexDirection:"row", alignItems:"center"}}>
        {/* <div>
          LGOG
        </div> */}
        <div>Abdel</div>

        <MoreButton menuItems={noteMenuItems} />

      </Row>
      <Row onClick={() => {
        dispatch(setCurrentNote({description: props.description, _id: props.id, title: props.title, last_edited: props.last_edited, noteDetail: props.noteDetail}));
        router.push(`${pathname}/${props.id}`);
      }} style={{padding:"5px", borderRadius:"10px", backgroundColor:"white", width:"100%", flexGrow:"1"}}>
        <Row style={{color:"#562CE5", fontSize:"14px", fontWeight:"bold"}}>
        {props?.last_edited? formatDate(props.last_edited): "N/A"}   
        </Row>
        <Row style={{color:"black", fontSize:"20px", marginTop:"5px"}}>
          {props?.title}
        </Row>
        <Row style={{
            color: "black", 
            fontSize: "16px", 
            marginTop: "5px", 
            display: "-webkit-box", 
            overflow: "hidden", 
            WebkitBoxOrient: "vertical", 
            WebkitLineClamp: 6, // Change this number for more or fewer lines
            width: "100%"
        }}>
            {props?.description}  
        </Row >
        {/* Positioned absolutely at the bottom */}
        <div style={{ 
            position: "absolute", 
            bottom: "10px", 
                width: "100%",
          }}>
          <hr style={{ width: "90%"}}/>
          <Row style={{ display: "flex", justifyContent: "flex-end", width: "100%", paddingRight:"12px"}}>
            <span style={{ marginRight: "5px" }}>Tag 1</span>
            <span style={{ marginRight: "5px" }}>Tag 2</span>
            <span style={{ marginRight: "5px" }}>Tag 3</span>
            {/* Add more tags as needed */}
          </Row>
        </div>
      </Row>
      <Confirmation open={openConfirmation} onClose={()=>setOpenConfirmation(false)} text={warningMessage} onConfirm={()=>handleDeleteNote()}/>

    </div>
  );
};
export default Note;
