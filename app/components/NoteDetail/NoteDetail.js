import React, {useEffect, useState, useRef} from 'react'; 
import styles from "./NoteDetail.module.css"
import Text from './Text';
import IMG from './IMG';
import { useSelector } from 'react-redux';

const NoteDetail = (props) => {
    const notes = props.notes //array
    const container = useRef();
    const currentNotes = useSelector((state) => state.languages.currentNote.noteDetail);
    const [initialLoad, setInitialLoad] = useState(true);


    useEffect(() => {
        if (!initialLoad) { //we will get here only after the first load, now we can scroll the container to the added element
            container.current.scrollTop = container.current.scrollHeight;
          } else {
            // Mark the initial load as complete after the initial render.
            setInitialLoad(false);
          }
    }, [currentNotes])
    
    const saveHandler = () => {
        console.log("SHOULD SAVE");
    }

    if (typeof notes[0] == 'string') {
        return <Text save={ saveHandler} text={notes[0]}/>
    }

    
    return (
        <div ref={ container} className={styles.container}>
            {notes.map((detail) =>
                {
                if (Object.keys(detail) == 'text') { return <Text save={ saveHandler} text={detail.text}/>}
                    if (Object.keys(detail) == 'img') { return <IMG img={detail.img} /> }
                })
            }
        </div>
    )
};

export default NoteDetail;