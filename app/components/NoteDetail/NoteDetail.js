import React, { useEffect, useState, useRef } from 'react';
import styles from './NoteDetail.module.css';
import Text from './Text';
import IMG from './IMG';
import { useSelector, useDispatch } from 'react-redux';
import { updateNote,setCurrentNote, addText,setSpinnerMessage } from '@/app/redux/slice';
import NoteDetailTag from './NoteDetailTag';
import LanguageServices from '@/app/LanguageServices';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Spinner from "@/app/components/Spinner/Spinner";

const NoteDetail = ({note, setNote}) => {
    const dispatch = useDispatch();
  // const [note, setNote] = useState(useSelector(state => state.languages.currentNote));
  const temporaryTextsRef = useRef([]);
  const selectedLanguageID = useSelector((state) => state.languages.currentLanguageID);
  const message = useSelector((state) => state.languages.spinnerMessage);
  let active = message !== "";

  const handleAddCode = ()=>{
    // Make the changes in the currentNote, and use this same currentNote for the update
    const updatedNoteDetail = note?.noteDetail ? [...note.noteDetail, { type: "text", detail: "" }] : [{ type: "text", detail: "" }];
    dispatch(addText());
  }
  const handleSaveNote = async ()=>{
    try{
      dispatch(setSpinnerMessage("Saving Note"));
      const response = await LanguageServices.updateNote({language_id: selectedLanguageID, title: note.title, description: note.description, note_detail:temporaryTextsRef.current, note_id: note._id});
      dispatch(setCurrentNote(response.notes.find(n=>n._id === note._id)));
      temporaryTextsRef.current = response.notes.find(n=>n._id === note._id).noteDetail;
    }catch(error){
      console.log("Error", error);
      throw error;
    }finally{
      dispatch(setSpinnerMessage(""));
    }
  }

  const actions = [
    { icon: <TextFieldsOutlinedIcon />, name: "Add Code", action: () => handleAddCode()},
    { icon: <SaveOutlinedIcon />, name: "Save Note", action: () => handleSaveNote()},
  ];

  useEffect(()=>{
    temporaryTextsRef.current = note.noteDetail;
  },[note])

  const updateText = (newText, index, type)=>{
    const temp = [...temporaryTextsRef.current];
    if(type === "text"){ // This iss when the content is being changed
      // Update the specific index
      temp[index] = { ...temp[index], content: newText };
    }else if(type === "language"){ // This is for the note's language
      temp[index] = { ...temp[index], language: newText };
    }
    // Assign the updated array back to the ref
    temporaryTextsRef.current = temp;
    setNote(prev=> ({...note, noteDetail: temp}));
  }
  const removeElement = (index)=>{
    // Switch the temporary with the one saved in the redux slice
    // Then change the state so that the ui update
    let temp = [...note.noteDetail];
    temp.splice(index, 1);
    // changeNoteDetail(temp);
    setNote(prev=> ({...note, noteDetail: temp}));
  }

  if (active) {
    return <Spinner/>;
  }

  return (
    <div style={{marginTop:"10px",  flexGrow:"1", overflowY:"visible", paddingBottom: "20px"}}>
      {note?.noteDetail?.map((info, index) => {
        if (info.type === "text") {
          return <Text  removeElement={removeElement} detail={info} key={info._id || `temp-${Math.random()}`} index={index} ref={temporaryTextsRef} updateText={updateText}/>;
        }
        if (info.type === "img") {
          return (
            <IMG img={info.img} key={index} />
          );
        }
      })}
      <div style={{ 
        height: "0px", // Just make it real small and only the speed dial will show
        width: "0px",
        display: "flex",
        position: "absolute",
        right: "0",
        bottom: "0",
      }}>
        <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.action}
                />
              ))}
          </SpeedDial>
      </div>
    </div>
  );
};

export default NoteDetail;
