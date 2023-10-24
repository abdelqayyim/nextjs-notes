'use client'
import styles from './page.module.css';
import React from 'react'; 
import { useSelector } from 'react-redux';
import NoteDetail from '@/app/components/NoteDetail/NoteDetail';

const pa = (props) => {
    //TODO: the state cannot be imported for some reason
    const currentNote = useSelector((state) => state.languages.currentNote);
    

    //NOTE: this should return d <div>, the layout takes care of the layout (wink)
    return (
        <div className={styles.container} contentEditable="true">
            <div className={styles.title} contentEditable="true">{ currentNote.noteTitle} </div>
            <div className={styles.description}>{ currentNote.noteDescription}</div>
            <NoteDetail notes={currentNote.noteDetail}/>
            
        </div>
    )
};

export default pa;

