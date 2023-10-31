import React, {useEffect} from 'react'; 
import styles from './Sidebar.module.css';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLanguage, fetchLanguages } from '@/app/redux/slice';
import { useRouter } from 'next/navigation';

import InputPopUp from '../PopUps/InputPopUp';

const Sidebar = (props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const languages = useSelector((state) => state.languages.value);
    const currentLanguageID = useSelector((state) => state.languages.currentLanguageID);


    const languageOnClick = (id) => {
        dispatch(setCurrentLanguage(id));
        dispatch(fetchLanguages());
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
                        <Link key={index} className={styles.link} href={`/${language.name.replace(/\s/g, "")}`}>
                            <li onClick={()=>languageOnClick(language._id)} key={language._id} className={`${styles["list-item"]} ${language._id == currentLanguageID? styles.active: ""}`}>{ toTitleCase(language.name)}</li>
                        </Link>
                    )
                })}
            </ul>
            {props.popUpActive && <InputPopUp mode={"add-note"} />}
        </div>
    )
};

export default Sidebar;