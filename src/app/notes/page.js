'use client'
import React, { Fragment, useContext, useEffect } from 'react'; 
import { ACTIONS, AppProvider } from "../../app/AppContext";
import AppContext from '../AppContext';
import Background from '../Background';
import styles from "./page.module.css";
import "../globals.css";
import Button from "../../components/button/LanguageButton";
import Head from 'next/head';
import { AddCircleOutline } from 'react-ionicons';
import Note from '../../components/note/Note';
import Sidebar from '../../components/Sidebar/Sidebar';
import RootLayout from '../layout';
import { useSelector, useDispatch } from 'react-redux';


const NotesList = (props) => {
    // const curr = useContext(AppProvider);

    // const count = useSelector((state) => state.counter.languages);
    // console.log(count);
    return (
        <RootLayout>
            {/* <div className={styles.main}>
                <Sidebar/>

                <div className={styles.mainbar}>
                    <div className={styles.topbar}>
                        Search
                    </div>
                    <div className={styles.content}>
                        <div className={styles.extras}>
                            <div className={styles["extras-btn"]}>
                                <div className={styles.active}>Button</div>
                                <div>Button</div>
                                <div>Button</div>
                            </div>
                            <div className={styles.add}>
                                <div className={styles.icon}><AddCircleOutline
                                    color={'#00000'} 
                                    title={""}/>
                                </div>
                                Add Note
                            </div>
                        </div>

                        <div className={styles["list-notes"]}>
                            
                            <Note title="Title" description="Description dsjfdlsgj dkjfg jdsl;fkg djhglkhdfklghdkfl gh jkdfhgjkdhslfkgjhdjkfhg jh kdjshgkjhdsjkg dhjgk djfhgjk jkdhfgkjhdfkjghkdfjhgkjdfhg kdjhg kjdhf gjkdhf jhdfgkjdkhdf hjdfgjkhdfkjghjkdfhg sdhjfgsjhd"/>
                            <Note title="Title" description="Description"/>
                            <Note title="Title" description="Description"/>
                            <Note title="Title" description="Description"/>
                            <Note title="Title" description="Description"/>
                            <Note title="Title" description="Description"/>
                            <Note title="Title" description="Description"/>
                            <Note title="Title" description="Description"/>
                            <Note title="Title" description="Description"/>
                            <Note title="Title" description="Description"/>
                            <Note title="Title" description="Description"/>

                        </div>
                    </div>
            </div>
            </div> */}
        </RootLayout>
    )
};

export default NotesList;