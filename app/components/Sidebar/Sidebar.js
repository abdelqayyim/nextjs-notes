import React, {useEffect} from 'react'; 
import styles from './Sidebar.module.css';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLanguage, viewingNotes } from '@/app/redux/slice';

import InputPopUp from '../PopUps/InputPopUp';

const Sidebar = (props) => {
    const dispatch = useDispatch();
    const languages = useSelector((state) => state.languages.value);
    const currentLanguageID = useSelector((state) => state.languages.currentLanguageID);


    const languageOnClick = (id) => {
        dispatch(setCurrentLanguage(id));
        dispatch(viewingNotes(true));
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.user}>Logo</div>
            <ul className={styles.list}>
                {languages.length > 0 && languages.map((language)=>{
                    return (
                        <Link className={styles.link} href={`/${language.name.replace(/\s/g, "")}`}>
                            <li onClick={()=>languageOnClick(language._id)} key={language._id} className={`${styles["list-item"]} ${language._id == currentLanguageID? styles.active: ""}`}>{ language.name}</li>
                        </Link>
                    )
                })}
            </ul>
            {props.popUpActive && <InputPopUp mode={"add-note"} />}
        </div>
    )
};

export default Sidebar;