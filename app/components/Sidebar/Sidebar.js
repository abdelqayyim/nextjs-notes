import React, {useEffect} from 'react'; 
import styles from './Sidebar.module.css';
import Link from 'next/link';

const Sidebar = (props) => {
    return (
        <div className={styles.sidebar}>
                    <div className={styles.user}>Logo</div>
            <ul className={styles.list}>
                {props.languages.length > 0 && props.languages.map((language)=>{
                    return (
                        <li onClick={()=>props.clicked(language._id)} key={language._id} className={`${styles["list-item"]} ${language._id == props.currentLanguage? styles.active: ""}`}>
                            <Link className={styles.link} href={`/${language.name.replace(/\s/g, "")}`}>{language.name }</Link>
                        </li>
                    )
                })}
                        </ul>
                </div>
    )
};

export default Sidebar;