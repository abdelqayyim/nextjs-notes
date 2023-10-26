"use client"
import React from 'react'; 
import styles from "./layout.module.css"
import Sidebar from '../components/Sidebar/Sidebar';
import AppProvider from '../redux/AppProvider';
import { Provider } from 'react-redux';
import Background from '../components/Background';
import { useSelector, useDispatch } from 'react-redux';
import { togglePopup } from '../redux/slice';
import { addText } from '../redux/slice';


const layout = ({ children }) => {
    const dispatch = useDispatch();
    const isUserTakingNote = useSelector((state) => state.languages.takingNote);
    const isUserViewingNotes = useSelector((state) => state.languages.viewingNotes);
    let popupActive =useSelector((state)=>state.languages.inputPopup);
    const addTextHandler = () => {
        dispatch(addText());
    }
    const addNoteHandler = () => {
        dispatch(togglePopup());
    }
    return (
        <div className={styles["root-div"]}>
            <Sidebar popUpActive={ popupActive}></Sidebar>
            <div className={styles["main-div"]}>
                <div className={styles["detail-div"]}>
                    INfo
                </div>
                <div className={styles["extras-div"]}>
                    {isUserTakingNote == true && <>
                        <div onClick={addTextHandler}>Add Text</div>
                    <div>Add Image</div>
                    <div>Save Note</div>
                    <div>Delete Note</div>
                    </>}
                    {isUserViewingNotes == true && <>
                        <div onClick={addNoteHandler}>Add Note</div>
                    </>}
                </div>
                <div className={styles["notes-div-parent"]}>
                    <div className={styles["notes-div-child"]}>
                        { children}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default layout;