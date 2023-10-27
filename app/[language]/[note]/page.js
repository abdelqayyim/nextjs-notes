'use client'
import styles from './page.module.css';
import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import NoteDetail from '@/app/components/NoteDetail/NoteDetail';
import { takingNote } from '@/app/redux/slice';
import { current } from 'immer';

const pa = (props) => {
    //TODO: the state cannot be imported for some reason
    const currentNote = useSelector((state) => state.languages.currentNote);
    const dispatch = useDispatch();
    dispatch(takingNote(true));
    

    //NOTE: this should return d <div>, the layout takes care of the layout (wink)
    return (
        <div className={styles.container} contentEditable="true">
            <div className={styles.title} contentEditable="true">{ currentNote.title.length == 0? 'No Title': currentNote.title} </div>
            <div className={styles.description}>{ currentNote.description.length == 0? "No Description":currentNote.description}</div>
            <NoteDetail notes={currentNote.noteDetail}/>
        </div>
    )
};

export default pa;

