import React from 'react'; 
import styles from "./NoteDetail.module.css"
import Text from './Text';

const NoteDetail = (props) => {
    const notes = props.notes //array
    console.log(notes);
    
    return (
        <div className={styles.container}>{notes.map((detail) => {
            if (Object.keys(detail) == 'text') {
                return <Text text={detail.text}/>
            }
            if (notes.length == 1) {
                return <Text text={notes[0]}/>
            }
        })}</div>
    )
};

export default NoteDetail;