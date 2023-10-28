"use client"
import React, {useRef} from 'react'; 
import styles from "./layout.module.css"
import Sidebar from '../components/Sidebar/Sidebar';
import AppProvider from '../redux/AppProvider';
import { Provider } from 'react-redux';
import Background from '../components/Background';
import { useSelector, useDispatch } from 'react-redux';
import { togglePopup } from '../redux/slice';
import { addText,addImage } from '../redux/slice';


const Layout = ({ children }) => {
    const file = useRef();
    const dispatch = useDispatch();
    const isUserTakingNote = useSelector((state) => state.languages.takingNote);
    const isUserViewingNotes = useSelector((state) => state.languages.viewingNotes);
    const currentNote = useSelector((state) => state.languages.currentNote);
    
    let popupActive =useSelector((state)=>state.languages.inputPopup);
    
    return (
        <div className={styles["root-div"]}>
            <Sidebar popUpActive={ popupActive}></Sidebar>
            {children}
        </div>
    )
};

export default Layout;