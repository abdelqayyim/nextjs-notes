"use client"
import React from 'react'; 
import styles from "./layout.module.css"
import Sidebar from '../components/Sidebar/Sidebar';
import AppProvider from '../redux/AppProvider';
import { Provider } from 'react-redux';
import Background from '../components/Background';


const layout = ({children})=>{
    return (
        <div className={styles["root-div"]}>
            <Sidebar ></Sidebar>
            <div className={styles["main-div"]}>
                <div className={styles["detail-div"]}>
                    INfo
                </div>
                <div className={styles["extras-div"]}>
                    <div>Button</div>
                    <div>Button</div>
                    <div>Button</div>
                    <div>Button</div>
                </div>
                <div className={styles["notes-div-parent"]}>
                    <div className={styles["notes-div-child"]}>
                        { children}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default layout;