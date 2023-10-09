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
                        <li key={language._id} className={`${styles["list-item"]} ${language.name == props.currentLanguage? styles.active: ""}`}>
                            <Link className={styles.link} href={`/${language.name}`}>{language.name }</Link>
                        </li>
                    )
                })}
                        </ul>
                </div>
    )
};

export default Sidebar;