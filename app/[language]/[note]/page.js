'use client'
import styles from './page.module.css';
import React, {useRef, useState, useEffect} from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import NoteDetail from '@/app/components/NoteDetail/NoteDetail';
import { setValue, addText, addImage, deleteNote, setSpinnerMessage,setErrorMessage } from '@/app/redux/slice';
import { useRouter, usePathname } from 'next/navigation';
import Spinner from "../../components/Spinner/Spinner";
import Confirmation from '@/app/components/Confirmation/Confirmation';

const Page = (props) => {
    //TODO: the state cannot be imported for some reason
    const URL = "https://fair-teal-gharial-coat.cyclic.app/languages/";
    const router = useRouter();
    const state = useSelector(state => state.languages);
    const currentNote = state.currentNote;
    const currentNotes = state.currentNote.noteDetail;
    const langName = usePathname().split('/')[1];
    const file = useRef();
    const dispatch = useDispatch();
    const [title, setTitle] = useState(currentNote.title);
    const [description, setDescription] = useState(currentNote.description);
    const titleRef = useRef();
    const descriptionRef = useRef();
    const message = useSelector((state) => state.languages.spinnerMessage);
    const [activeConfirmation, setActiveConfirmation] = useState(false);
    let active = message !== "";

    if (title == null) {
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
    
    const confirmHandler = (response) => {
        setActiveConfirmation(false);
        if (response == 'yes') {
            // call the delete function
            deleteNoteHandler();
            router.replace(`/${langName}`);
        }
        
    }
    const deleteNoteHandler = async () => {
        let note = {
            _id: currentNote._id,
            noteDetail:[...currentNotes],
            title: title,
            description: description,
        }
        try {
            //check to see if title already exists
            dispatch(setSpinnerMessage("Deleting Note"));
            const response = await fetch(URL +`${state.currentLanguageID}/deleteNote`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(note),
            })
            const data = await response.json();
            dispatch(setErrorMessage({ message: "Note sucessfully Deleted", sign: "positive" }));
            dispatch(setSpinnerMessage(""));
            // save it to the global values
            let newLanguageObject = data;
            let tempVal = [...state.value];
            tempVal = tempVal.map((languageOBJ) => {
                if (languageOBJ._id === state.currentLanguageID) {
                    return {...newLanguageObject };
                }
                return languageOBJ;
            })
            dispatch(setValue(tempVal));
        }
        catch (error) {
            dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
            dispatch(setSpinnerMessage(""));
            throw error;
        }
    }
    const saveNoteHandler = async () => {
        let note = {
            _id: currentNote._id,
            noteDetail:[...currentNotes],
            title: title,
            description: description,
        }
        try {
            dispatch(setSpinnerMessage("Saving Note"));
            const response = await fetch(URL +`${state.currentLanguageID}/updateNote`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })
            const data = await response.json();
            dispatch(setErrorMessage({ message: "Note sucessfully Save", sign: "positive" }));
            dispatch(setSpinnerMessage(""));
            // save it to the global values
            let newLanguageObject = data;
            let tempVal = [...state.value];
            tempVal = tempVal.map((languageOBJ) => {
                if (languageOBJ._id === state.currentLanguageID) {
                    return {...newLanguageObject };
                }
                return languageOBJ;
            })
            dispatch(setValue(tempVal));
        }
        catch (error) {
            dispatch(setErrorMessage({ message: `${error}`, sign: "negative" }));
            dispatch(setSpinnerMessage(""));
            throw error;
        }
    }
    
   

    //NOTE: this should return d <div>, the layout takes care of the layout (wink)
    return (


        <div className={styles["main-div"]}>
            {activeConfirmation && <Confirmation response={confirmHandler} title="Confirm Note Deletion" />}
            { active && <Spinner/>}
            <div className={styles["detail-div"]}>
                INfo
            </div>
            
            <div className={styles["extras-div"]}>
                <div onClick={addTextHandler}><span class="material-symbols-outlined">text_fields</span> Add Text</div>
                <label for="addFile" className={styles.imgBtn}><span class="material-symbols-outlined">image</span>Add Image<input className={styles.img} type="file" ref={file} id="addFile" onChange={addImageHandler}/></label>
                <div className={styles.save} onClick={saveNoteHandler}><span class="material-symbols-outlined">bookmark_added</span>Save Note</div>
                <div className={styles.delete} onClick={()=>setActiveConfirmation(true)}><span class="material-symbols-outlined">delete_forever</span>Delete Note</div>
            </div>
            
            <div className={styles["notes-div-parent"]}>
                <div className={styles["notes-div-child"]}>
                    <div className={styles.container} contentEditable="true">
                        <input placeholder='Title' ref={titleRef} value={ title} onChange={()=>setTitle(titleRef.current.value)} className={styles.title} contentEditable="true"/>
                        <input placeholder='Description' ref={descriptionRef} value={ description} onChange={()=>setDescription(descriptionRef.current.value)} className={styles.description} contentEditable="true"/>
                        <NoteDetail notes={currentNotes} save={ saveNoteHandler} />
                    </div>
                </div>
            </div>
        </div>



        
    )
};

export default Page;

