'use client'
import styles from "./layout.module.css";
import React, {useEffect} from 'react'; 
import { useParams } from 'next/navigation';
import Sidebar from '../components/Sidebar/Sidebar';
import Note from "../components/note/Note";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLanguages, setCurrentLanguage } from "../redux/slice";
import { LOADING_STATE } from "../redux/slice";
import Message from "../components/message-popup/Message";


const page = (props) => {
    const dispatch = useDispatch();
    const languages = useSelector((state) => state.languages.value);
    let loadingState = useSelector((state) => state.languages.loading);
    const currentParamLang = decodeURIComponent(useParams().language);
    let curr;
    
    useEffect(() => {
        if (languages.length === 0) {
            // Dispatch the action to fetch languages when the component mounts
            dispatch(fetchLanguages());
        }
    }, [dispatch, languages]);

    for (let language of languages) {
        if (language.name.replace(/\s/g, "") == currentParamLang) {
            curr = language._id;
            dispatch(setCurrentLanguage(language._id))
            break;
        }
    }
    
    let langObject = languages.filter((language) => language._id == curr);
    
    let notes = []
    langObject.map((obj) => {
        obj.notes.map((note) => {
            notes.push(note)
        })
    })

    if (loadingState == LOADING_STATE.LOADING) {
        return <Message message={"Loading Notes"} />;
    }

    return (
        <div className={styles["notes-div-child"]}>
            {notes.map((note) => <Note detail={note.noteDetail} title={note.title} description={note.description} id={note._id} />)}
        </div>
    )
};
export default page;