'use client'
import styles from "./page.module.css";
import React, {useEffect} from 'react'; 
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation';
import Sidebar from '../components/Sidebar/Sidebar';
import NoteDisplay from '../components/note-display/NoteDisplay';
import Note from "../components/note/Note";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLanguages } from "../redux/slice";

const page = (props) => {
    const dispatch = useDispatch();
    const languages = useSelector((state)=>state.languages.value)

    useEffect(() => {
        if (languages.length === 0) {
            // Dispatch the action to fetch languages when the component mounts
            dispatch(fetchLanguages());
        }
    }, [dispatch, languages]);
    const currentLanguage = useParams().language;
    let langObject = languages.filter((language) => language.name == currentLanguage);
    let notes = []
    langObject.map((obj) => {
        obj.notes.map((note) => {
            notes.push(note)
        })
    })

    return (
        <div className={styles["root-div"]}>
            <Sidebar languages={languages} currentLanguage={currentLanguage}></Sidebar>
            <div className={styles["main-div"]}>
                <div className={styles["detail-div"]}>
                    INfo
                </div>
                <div className={styles["extras-div"]}>
                    extras
                </div>
                <div className={styles["notes-div"]}>
                    {notes.map((note) => <Note title={note.title} description={ note.description}/>)}
                    
                </div>
            </div>
        </div>
    )
};

export default page;