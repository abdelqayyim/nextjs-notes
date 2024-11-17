'use client'
import styles from './page.module.css';
import React, {useRef, useState, useEffect} from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import NoteDetail from '@/app/components/NoteDetail/NoteDetail';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import TextFieldsOutlined from '@mui/icons-material/TextFieldsOutlined';
import {
    setValue,
    setlanguagesList,
    addText, addImage, deleteNote, setSpinnerMessage, setErrorMessage, setCurrentNote, setCurrentLanguage
} from '@/app/redux/slice';
import { usePathname, useParams } from 'next/navigation';
import LanguageServices from '@/app/LanguageServices';

const Page = (props) => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    let allData = useSelector((state) => state.languages);
    const [languageName, setLanguageName] = useState(allData.value.find((obj) => obj._id === allData.currentLanguageID)?.name);
    const [note, setNote] = useState(useSelector((state) => state.languages.currentNote));
    let note_id = useParams().note;
    let paramLanguageName = useParams().language;

    useEffect(() => {
        if (!languageName) { // If the value is not already loaded
            const fetchData = async () => {
                dispatch(setSpinnerMessage("Loading Note"));
                try {
                    const data = await LanguageServices.getAllLanguages();
                    dispatch(setValue(data));
                    let pathLanguageName = pathname.split('/')[1];
                    const currentLanguageObject = data.find(obj => obj.name.toLowerCase() === paramLanguageName.toLowerCase());
                    const currentNote = currentLanguageObject?.notes.find(note => note._id === note_id);
                    dispatch(setCurrentLanguage(currentLanguageObject?._id));
                    dispatch(setCurrentNote(currentNote));
                    setLanguageName(currentLanguageObject?.name);
                    setNote(currentNote);
              return data;
            } catch (error) {
              dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
              throw error;
            }finally{
                dispatch(setSpinnerMessage(""));
            }
          }
          fetchData();
        }
    }, []);

    return (
        <div style={{display:"flex",flexDirection:"column", width:"100%"}}>
            <div style={{marginTop:"10px", width:"100%", height:"50px", fontSize:"32px"}}>
                {languageName} - {note?.title}
            </div>
            <NoteDetail note={note} setNote={setNote} changeNoteDetail={(newValue)=>setNote(prev=> ({...note, noteDetail: newValue}))}/>
        </div>
    )
};

export default Page;

