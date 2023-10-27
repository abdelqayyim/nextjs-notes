"use client"
import React, {useRef} from 'react'; 
import styles from "./layout.module.css"
import Sidebar from '../components/Sidebar/Sidebar';
import AppProvider from '../redux/AppProvider';
import { Provider } from 'react-redux';
import Background from '../components/Background';
import { useSelector, useDispatch } from 'react-redux';
import { togglePopup } from '../redux/slice';
import { addText,addImage } from '../redux/slice';


const layout = ({ children }) => {
    const file = useRef();
    const dispatch = useDispatch();
    const isUserTakingNote = useSelector((state) => state.languages.takingNote);
    const isUserViewingNotes = useSelector((state) => state.languages.viewingNotes);
    const currentNote = useSelector((state) => state.languages.currentNote);
    
    let popupActive =useSelector((state)=>state.languages.inputPopup);
    const addTextHandler = () => {
        dispatch(addText());
    }
    const addNoteHandler = () => {
        dispatch(togglePopup());
    }
    const addImageHandler = () => {
        console.log("CLICKED");
        const fileInput = file.current; // Get the input element using the ref
        const selectedFile = fileInput.files[0]; // Get the selected file
    
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const uploadedImage = reader.result; // Get the image data
                dispatch(addImage(uploadedImage));
            };
            reader.readAsDataURL(selectedFile); // Start reading the selected file
        }
    }
    const deleteNoteHandler = () => {
        console.log(currentNote);
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
                        <label for="addFile" className={styles.imgBtn}>Add Image<input className={styles.img} type="file" ref={file} id="addFile" onChange={addImageHandler}/></label>
                    <div>Save Note</div>
                    <div onClick={deleteNoteHandler}>Delete Note</div>
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