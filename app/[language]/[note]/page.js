'use client'
import styles from './page.module.css';
import React, {useRef, useState, useEffect} from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import NoteDetail from '@/app/components/NoteDetail/NoteDetail';
import { saveNote, fetchLanguages, getCurrentNote, addImage } from '@/app/redux/slice';
import Text from '../../components/NoteDetail/Text';
import IMG from '../../components/NoteDetail/IMG';

const pa = (props) => {
    //TODO: the state cannot be imported for some reason
    const currentNote = useSelector((state) => state.languages.currentNote);
    const currentNotes = useSelector((state) => state.languages.currentNote.noteDetail);
    const [newNotes, setNewNotes] = useState(currentNotes);//this is what will be sent to save the note
    // const [displayNotes, setDisplayNotes] = useState([]);
    const file = useRef();
    const dispatch = useDispatch();
    const [title, setTitle] = useState(currentNote.title);
    const [description, setDescription] = useState(currentNote.description);
    const titleRef = useRef();
    const descriptionRef = useRef();

    const addTextHandler = () => {
        // dispatch(addText());
        setNewNotes([...newNotes, { text: "Here" }]);
    }

    const addImageHandler = () => {
        const fileInput = file.current; // Get the input element using the ref
        const selectedFile = fileInput.files[0]; // Get the selected file
    
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const uploadedImage = reader.result; // Get the image data
                dispatch(addImage(uploadedImage));
                // setNewNotes([...currentNotes, { img: uploadedImage }]);
            };
            reader.readAsDataURL(selectedFile); // Start reading the selected file
        }
    }
    
    const deleteNoteHandler = () => {
        console.log(currentNote);
    }
    const saveNoteHandler = () => {
        dispatch(saveNote([title, description]));
    }
    
    if (typeof newNotes[0] == 'string') {
        return <Text save={ saveHandler} text={notes[0]}/>
    }

    useEffect(() => {
        if (title.current) {
            title.current.addEventListener("input", ()=>console.log("CHANGING"))
        }
     },[])
    
    const changeTitle = () => {
        setTitle(titleRef.current.value);
    }
    const changeDescription = () => {
        setDescription(descriptionRef.current.value);
    }

    //NOTE: this should return d <div>, the layout takes care of the layout (wink)
    return (

        <div className={styles["main-div"]}>
                <div className={styles["detail-div"]}>
                    INfo
                </div>
                <div className={styles["extras-div"]}>
                

                <div onClick={addTextHandler}>Add Text</div>
                        <label for="addFile" className={styles.imgBtn}>Add Image<input className={styles.img} type="file" ref={file} id="addFile" onChange={addImageHandler}/></label>
                    <div onClick={saveNoteHandler}>Save Note</div>
                    <div onClick={deleteNoteHandler}>Delete Note</div>

                </div>
                <div className={styles["notes-div-parent"]}>
                    <div className={styles["notes-div-child"]}>
                    <div className={styles.container} contentEditable="true">
            <input placeholder='Title' ref={titleRef} value={ title} onChange={changeTitle} className={styles.title} contentEditable="true"/>
            <input placeholder='Description' ref={descriptionRef} value={ description} onChange={changeDescription} className={styles.description} contentEditable="true"/>
                        <NoteDetail notes={newNotes} save={ saveNoteHandler} />
        </div>
                    </div>
                </div>
            </div>



        
    )
};

export default pa;

