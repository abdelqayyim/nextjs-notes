import React, {useEffect} from 'react'; 
import styles from './Sidebar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLanguage,setCurrentNotes } from '@/app/redux/slice';
import { useRouter } from 'next/navigation';

import InputPopUp from '../PopUps/InputPopUp';

const Sidebar = (props) => {
    // before the sidebar languages are display, the data is already fetched no need to do it again
    const dispatch = useDispatch();
    const router = useRouter();
    const languages = useSelector((state) => state.languages.value);
    const currentLanguageID = useSelector((state) => state.languages.currentLanguageID);
    const currentLanguageName = useSelector((state) => state.languages.currentLanguageID);
    const currentNotes = useSelector((state) => state.languages.currentNotes);


    const languageOnClick = (id, name) => {
        //make sure youre at the right page 
        router.push(`/${name.replace(/\s/g, "")}`)
        let newNotes = languages.filter(language => {
            if (language._id == id) {
                return language.notes;
            }
        })
        dispatch(setCurrentLanguage(id));
        dispatch(setCurrentNotes(newNotes[0].notes));
    }
    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
    }


    return (
        <div className={styles.sidebar}>
            <div className={styles.user} onClick={()=>router.push(`/`)}>
            <div className={styles["typewriter"]}>
          <h1>My Notes</h1>
        </div>
            </div>
            <ul className={styles.list}>
                {languages.length > 0 && [...languages].reverse().map((language, index)=>{
                    return (
                        <><li onClick={() => languageOnClick(language._id, language.name)} key={language._id} className={`${styles["list-item"]} ${styles.tooltip} ${language._id == currentLanguageID ? styles.active : ""}`}>
                        <span className={styles.tooltiptext}>{ toTitleCase(language.name)}</span>{toTitleCase(language.name)}</li></>
                    )
                })}
            </ul>
            {props.popUpActive && <InputPopUp mode={"add-note"} />}
        </div>
    )
};

export default Sidebar;