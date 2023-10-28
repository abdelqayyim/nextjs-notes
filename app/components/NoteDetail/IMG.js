import React from 'react'; 
import styles from '@/app/components/NoteDetail/IMG.module.css';

const IMG = (props) => {
    const moveHandler = () => {
        props.move(props.index);
    }
    const deleteHandler = () => {
        props.delete(props.index);
    }
    return (
        <div className={styles.parent}>
            <div className={styles.btn}>
                {props.index != 0 && <div onMouseDown={moveHandler}><span class="material-symbols-outlined">expand_less</span></div>}
                <div onMouseDown={deleteHandler} ><span class="material-symbols-outlined">delete_forever</span></div>
            </div>
    
            <div>
                <img height={'500px'} type="image" src={props.img}></img>
            </div>
            
        </div>
    )
};

export default IMG;