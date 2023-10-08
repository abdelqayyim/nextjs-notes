import React from 'react'; 
import styles from './Sidebar.module.css';


const Sidebar = (props) => {
    let languages = ["python", "Java", "C++", "C#"]
    
    return (
        <div className={styles.sidebar}>
                    <div className={styles.user}>Logo</div>
            <ul className={styles.list}>
                {languages.map((language)=>{
                    return (
                        <li className={styles["list-item"]}>
                            {language }
                        </li>
                    )
                })}
                        </ul>
                </div>
    )
};

export default Sidebar;