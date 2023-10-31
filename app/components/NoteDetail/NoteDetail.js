import React, { useEffect, useState, useRef } from 'react';
import styles from './NoteDetail.module.css';
import Text from './Text';
import IMG from './IMG';
import { addText } from '@/app/redux/slice';
import { useSelector, useDispatch } from 'react-redux';
import { updateNote } from '@/app/redux/slice';

const NoteDetail = (props) => {
    
    const dispatch = useDispatch();
    const container = useRef();
    const globalNotes = useSelector((state) => state.languages.currentNote.noteDetail);
    const [initialLoad, setInitialLoad] = useState(true);
    
    const [notes, setNotes] = useState([]);
    
    
  useEffect(() => {
    let temp = [...globalNotes];
    if (temp.length == 1 && typeof temp[0] == 'string') {
      let str = temp[0];
      setNotes(prev => [{ text: str }]);
    } else {
      setNotes(prev => [...globalNotes]);
    }
    
  }, [globalNotes]);

    const deleteNoteHandler = (index) => {
        let temp = [...notes];
        temp.splice(index, 1);
        setNotes(prev => temp);
        dispatch(updateNote(temp));

    }
    const moveHandler = (index) => {
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
        if (Object.keys(note).includes('text')) {
          return (
            <Text key={index} delete={deleteNoteHandler} save={updateNoteHandler} index={index} text={notes[index].text} move={moveHandler} />
          );
        }
        if (Object.keys(note).includes('img')) {
          return (
              <IMG key={index} img={notes[index].img} delete={deleteNoteHandler} index={index} move={moveHandler}/>
          );
        }
      })}
    </div>
  );
};

export default NoteDetail;
