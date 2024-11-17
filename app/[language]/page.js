"use client";
import styles from "./layout.module.css";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Note from "../components/Note/Note";
import { useSelector, useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import CreateNoteForm from '../components/Forms/CreateNoteForm/CreateNoteForm';
import {
  setValue,
  setlanguagesList,
  setCurrentLanguage,
  setCurrentNotes,
  togglePopup,
  setSpinnerMessage,
  setErrorMessage
} from "../redux/slice";
import Spinner from "../components/Spinner/Spinner";
import LanguageServices from "../LanguageServices";
import { Row } from "react-bootstrap";
const Page = (props) => {
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.languages.value);
  const selectedLanguageID = useSelector((state) => state.languages.currentLanguageID);
  const languageName = useParams().language.toLowerCase();
  const message = useSelector((state) => state.languages.spinnerMessage);
  let active = message !== "";
  const [noteEntity, setNoteEntity] = useState(useSelector((state) => state.languages.value.find(obj => obj._id === selectedLanguageID)));
  const [openForm, setOpenForm] = useState(false);
  console.log(`allData`,allData);

  const fetchData = async () => {
    dispatch(setSpinnerMessage("Loading Language"));
    setOpenForm(false);
    try {
      const data = await LanguageServices.getAllLanguages();
      dispatch(setSpinnerMessage(""));
      let formattedData = data.map(obj => ({ _id: obj._id, name: obj.name }));
      dispatch(setlanguagesList(formattedData));
      dispatch(setValue(data))
      setNoteEntity(data.find(obj => obj.name.toLowerCase() === languageName.toLowerCase()));
      return data;
    } catch (error) {
      dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
      throw error;
    }
  }
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => { 
    if (!selectedLanguageID) {
      let chosenLanguage = allData.find(obj => obj.name.toLowerCase() === languageName.toLowerCase());
      dispatch(setCurrentLanguage(chosenLanguage?._id));
      setNoteEntity(chosenLanguage);
      console.log("HERE___________________");
    }
  }, [allData, dispatch, noteEntity, languageName, selectedLanguageID])

  const addNoteHandler = ()=>{
    dispatch(togglePopup());
  } 

  if (active) {
    return <Spinner/>;
  }

  const actions = [
    { icon: <AddIcon />, name: "Add", action: () => setOpenForm(true)},
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];


  return (
    <div style={{ width: '100%', height: '100%', display: "flex", flexDirection: "column", overflowY: "scroll", position: "relative" }}>
      <CreateNoteForm isOpen={openForm} handleClose={() => setOpenForm(false)} refetch={()=>fetchData() } />
      <Row style={{width:"100%", marginTop:"5px", height:"60px", display:"flex", flexDirection:"row", alignItems:'center'}}>
        {noteEntity?.logo && 
          <div>
            LOGO
          </div>
        }
        <div style={{marginRight:"5px", fontSize:"38px"}}>
          {noteEntity?.name}
        </div>
        <span class="material-symbols-outlined">
          tune
        </span>
      </Row>
      <Row style={{ flexGrow: "1", marginTop: "5px", padding: "10px 0px", display:"flex", flexDirection:"row", flexWrap: "wrap",position: "relative"}}>
          {noteEntity?.notes.length === 0 ? (
            <>No notes added</>
          ) : (
            noteEntity?.notes.map((note) => (
              <Note
                key={note._id}
                id={note._id}
                title={note.title}
                description={note.description}
                noteDetail={note.noteDetail}
                last_edited={note.last_edited}
                refetch={()=>fetchData()}
              />
            ))
          )}
        </Row>
      
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
export default Page;
