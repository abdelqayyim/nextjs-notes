'use client'
import styles from './page.module.css';
import React, {useRef, useState, useEffect} from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import NoteDetail from '@/app/components/NoteDetail/NoteDetail';
import { saveNote, addText, addImage, deleteNote, fetchLanguages } from '@/app/redux/slice';
import Text from '../../components/NoteDetail/Text';
import IMG from '../../components/NoteDetail/IMG';
import { useRouter, usePathname } from 'next/navigation';

const pa = (props) => {
    //TODO: the state cannot be imported for some reason
    const router = useRouter();
    const state = useSelector(state => state.languages);
    const currentNote = state.currentNote;
    const currentNotes = state.currentNote.noteDetail;
    const currentNoteID = state.currentNote._id;
    const [newNotes, setNewNotes] = useState(currentNotes);//this is what will be sent to save the note
    const langName = usePathname().split('/')[1];
    const file = useRef();
    const dispatch = useDispatch();
    const [title, setTitle] = useState(currentNote.title);
    const [description, setDescription] = useState(currentNote.description);
    const titleRef = useRef();
    const descriptionRef = useRef();

    if (title == null) {
        console.log(langName);
        router.push(`/${langName}`);
        return;
    }

    const addTextHandler = () => {
        dispatch(addText());
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
        let note = { _id: currentNoteID, title:title, description: description, noteDetail: currentNotes };
        dispatch(deleteNote(note));
        router.push(`/${langName}`)
    }
    const saveNoteHandler = () => {
        dispatch(saveNote([title, description]));
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
                <div onClick={addTextHandler}><span class="material-symbols-outlined">text_fields</span> Add Text</div>
                <label for="addFile" className={styles.imgBtn}><span class="material-symbols-outlined">image</span>Add Image<input className={styles.img} type="file" ref={file} id="addFile" onChange={addImageHandler}/></label>
                <div className={styles.save} onClick={saveNoteHandler}><span class="material-symbols-outlined">bookmark_added</span>Save Note</div>
                <div className={styles.delete} onClick={deleteNoteHandler}><span class="material-symbols-outlined">delete_forever</span>Delete Note</div>
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

