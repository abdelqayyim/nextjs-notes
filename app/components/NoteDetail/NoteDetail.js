import React, { useEffect, useState, useRef } from 'react';
import styles from './NoteDetail.module.css';
import Text from './Text';
import IMG from './IMG';
import { useSelector, useDispatch } from 'react-redux';
import { updateNote } from '@/app/redux/slice';

const NoteDetail = (props) => {
    
    const dispatch = useDispatch();
    const container = useRef();
    const globalNotes = useSelector((state) => state.languages.currentNote.noteDetail);
    const [initialLoad, setInitialLoad] = useState(true);
    
    const [notes, setNotes] = useState([]);
    
    
    useEffect(() => { setNotes(prev => globalNotes); }, [globalNotes]);
    console.log(notes.length);

    const moveHandler = (index) => {
    //     console.log(...notes);
    let temp = [...notes];
    let t = temp[index - 1];
    temp[index - 1] = temp[index];
        temp[index] = t;
        setNotes(prev => temp);
        dispatch(updateNote(temp));
  };
  const updateNoteHandler = (index, value) => {
    const temp = [...notes];
      temp[index] = value;
      setNotes(prev => temp);
      dispatch(updateNote(temp));
    };

  useEffect(() => {
    if (!initialLoad) {
      container.current.scrollTop = container.current.scrollHeight;
    } else {
      setInitialLoad(false);
    }
  }, []);
    

  return (
    <div ref={container} className={styles.container}>
          {notes.map((note, index) => {
          console.log(notes);
        if (Object.keys(note).includes('text')) {
          return (
            <Text save={updateNoteHandler} index={index} text={notes[index].text} move={moveHandler} />
          );
        }
        if (Object.keys(note).includes('img')) {
          return (
              <IMG img={ notes[index].img} />
          );
        }
      })}
    </div>
  );
};

export default NoteDetail;
