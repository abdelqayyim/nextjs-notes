import React, {useEffect, useState} from 'react'; 
import styles from './Sidebar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentLanguage,setCurrentNotes } from '@/app/redux/slice';
import { useRouter } from 'next/navigation';
import { Row, Col } from 'react-bootstrap';
import InputPopUp from '../PopUps/InputPopUp';
import { addIcon } from '@/app/IconSVG/IconSVG';

const Sidebar = (props) => {
    // before the sidebar languages are display, the data is already fetched no need to do it again
    const dispatch = useDispatch();
    const router = useRouter();
    const languages = useSelector((state) => state.languages.value);
    const currentLanguageID = useSelector((state) => state.languages.currentLanguageID);
    const currentLanguageName = useSelector((state) => state.languages.currentLanguageID);
    const currentNotes = useSelector((state) => state.languages.currentNotes);
    const [collapsedSidebar, setCollapsedSidebar] = useState(false);

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

    const handleCreateLanguage = () => {
        console.log("Should create a new language");
    }


    if (!collapsedSidebar) {
        return (
            <div className={styles["sidebar-parent-div-collapsed"]}>
            <div className={styles["sidebard-collapse-btn"]} onClick={()=>setCollapsedSidebar(prev=>!prev)}>
                <span class="material-symbols-outlined">
                expand_circle_right
                </span>
            </div>

                <Row>
                    <div onClick={handleCreateLanguage} className={styles["sidebar-top-button-collapsed"]} style={{backgroundColor:"#0A99FE",width:"40px", borderRadius:"10px", marginTop:"10px"}}>
                        <span class="material-symbols-outlined">
                            add
                        </span>
                    </div>
                </Row>
                
                <Row>
                <div className={styles["sidebar-top-button"]} style={{backgroundColor:"#9c34c2", width:"40px"}}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 64 64">
                                <circle cx="32" cy="32" r="23" fill="#9c34c2"></circle><ellipse cx="32" cy="61" opacity=".3" rx="19" ry="3"></ellipse><path fill="#fff" d="M32,14c2.577,0,4.674-1.957,4.946-4.461C35.352,9.19,33.699,9,32,9	C19.297,9,9,19.297,9,32c0,1.699,0.19,3.352,0.539,4.946C12.044,36.674,14,34.577,14,32C14,22.075,22.075,14,32,14z" opacity=".3"></path><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M15.047,23.427c1.878-3.699,4.932-6.705,8.666-8.522"></path><path fill="#a0effe" d="M37.184,43.111c4.556-1.02,7.818-3.645,7.818-9.252c0-2.6-0.787-4.556-1.97-6.011	c-0.273-0.336-0.274-1.056-0.162-1.474c0.281-1.043,0.066-2.404-0.17-3.383c-0.177-0.73-0.94-1.156-1.662-0.949	c-1.707,0.491-3.115,1.466-4.138,2.136c-0.279,0.182-0.602,0.255-0.931,0.203c-1.244-0.197-2.581-0.282-3.964-0.302L32,24.113V24.08	c-1.383,0.02-2.72,0.105-3.964,0.302c-0.329,0.052-0.652-0.021-0.931-0.203c-1.023-0.669-2.431-1.644-4.138-2.136	c-0.721-0.208-1.485,0.219-1.662,0.949c-0.237,0.979-0.451,2.341-0.17,3.383c0.113,0.418,0.112,1.138-0.162,1.474	c-1.183,1.455-1.97,3.41-1.97,6.011c0,5.607,3.261,8.232,7.818,9.252c0.774,0.173,0.843,1.018,0.544,1.753	c-0.236,0.582-0.368,1.009-0.368,1.677v0.315c-0.168,0.046-0.342,0.087-0.53,0.111c-1.142,0.147-1.98,0-2.559-0.343	c-0.58-0.343-1.267-0.909-1.783-1.662c-0.435-0.635-1.375-2.003-3.596-1.949c-0.388-0.01-0.565,0.354-0.516,0.581	c0.044,0.2,0.22,0.516,0.924,0.773c0.706,0.259,1.169,0.788,1.556,1.411c0.431,0.695,0.693,2.143,2.196,3.218	c0.901,0.644,2.078,1.036,2.954,0.996c0.742-0.034,1.355,0.574,1.355,1.317l0.001,1.628c0,0.659-0.603,1.326-1.228,1.21	c1.854,0.624,4.129,0.813,6.229,0.84v-0.047l0.005,0.047c2.1-0.026,4.375-0.216,6.229-0.84c-0.625,0.115-1.228-0.552-1.228-1.21	l0.002-6.396c0-0.668-0.132-1.095-0.368-1.677C36.342,44.13,36.41,43.285,37.184,43.111z"></path><path d="M54.461,27.054C51.956,27.326,50,29.423,50,32c0,9.925-8.075,18-18,18	c-2.577,0-4.674,1.957-4.946,4.461C28.648,54.81,30.301,55,32,55c12.703,0,23-10.297,23-23C55,30.301,54.81,28.648,54.461,27.054z" opacity=".15"></path>
                            </svg>
                        </div>
                    </div>
                </Row>
            <Row className={styles["sidebar-full-row"]} onClick={()=>router.push(`/`)}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        home
                    </span>
                </div>
            </Row>
            <Row className={styles["sidebar-full-row"]}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        search
                    </span>
                </div>
            </Row>
            <Row className={styles["sidebar-full-row"]}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        bookmark
                    </span>
                </div>
            </Row>
            <Row className={styles["sidebar-full-row"]}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        sell
                    </span>
                </div>
            </Row>
            <Row className={styles["sidebar-full-row"]}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        code
                    </span>
                </div>
            </Row>
            <Row className={styles["sidebar-full-row"]}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        settings
                    </span>
                </div>
            </Row>
            <Row className={styles["sidebar-full-row"]}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        logout
                    </span>
                </div>
            </Row>
        </div>
        )
    } else {
        return (
            <div className={styles["sidebar-parent-div"]}>
            <div class={styles["sidebard-collapse-btn"]} onClick={()=>setCollapsedSidebar(prev=>!prev)}>
                <span class="material-symbols-outlined">
                expand_circle_right
                </span>
            </div>
            <Row style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", width:"90%"}}>
                <Col >
                    <div className={styles["sidebar-top-button"]} style={{backgroundColor:"#0A99FE"}}>
                        <span class="material-symbols-outlined">
                            add
                        </span>
                        Create
                    </div>
                </Col>
                <Col>
                    <div className={styles["sidebar-top-button"]} style={{backgroundColor:"#9c34c2"}}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 64 64">
                                <circle cx="32" cy="32" r="23" fill="#9c34c2"></circle><ellipse cx="32" cy="61" opacity=".3" rx="19" ry="3"></ellipse><path fill="#fff" d="M32,14c2.577,0,4.674-1.957,4.946-4.461C35.352,9.19,33.699,9,32,9	C19.297,9,9,19.297,9,32c0,1.699,0.19,3.352,0.539,4.946C12.044,36.674,14,34.577,14,32C14,22.075,22.075,14,32,14z" opacity=".3"></path><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" strokeWidth="3" d="M15.047,23.427c1.878-3.699,4.932-6.705,8.666-8.522"></path><path fill="#a0effe" d="M37.184,43.111c4.556-1.02,7.818-3.645,7.818-9.252c0-2.6-0.787-4.556-1.97-6.011	c-0.273-0.336-0.274-1.056-0.162-1.474c0.281-1.043,0.066-2.404-0.17-3.383c-0.177-0.73-0.94-1.156-1.662-0.949	c-1.707,0.491-3.115,1.466-4.138,2.136c-0.279,0.182-0.602,0.255-0.931,0.203c-1.244-0.197-2.581-0.282-3.964-0.302L32,24.113V24.08	c-1.383,0.02-2.72,0.105-3.964,0.302c-0.329,0.052-0.652-0.021-0.931-0.203c-1.023-0.669-2.431-1.644-4.138-2.136	c-0.721-0.208-1.485,0.219-1.662,0.949c-0.237,0.979-0.451,2.341-0.17,3.383c0.113,0.418,0.112,1.138-0.162,1.474	c-1.183,1.455-1.97,3.41-1.97,6.011c0,5.607,3.261,8.232,7.818,9.252c0.774,0.173,0.843,1.018,0.544,1.753	c-0.236,0.582-0.368,1.009-0.368,1.677v0.315c-0.168,0.046-0.342,0.087-0.53,0.111c-1.142,0.147-1.98,0-2.559-0.343	c-0.58-0.343-1.267-0.909-1.783-1.662c-0.435-0.635-1.375-2.003-3.596-1.949c-0.388-0.01-0.565,0.354-0.516,0.581	c0.044,0.2,0.22,0.516,0.924,0.773c0.706,0.259,1.169,0.788,1.556,1.411c0.431,0.695,0.693,2.143,2.196,3.218	c0.901,0.644,2.078,1.036,2.954,0.996c0.742-0.034,1.355,0.574,1.355,1.317l0.001,1.628c0,0.659-0.603,1.326-1.228,1.21	c1.854,0.624,4.129,0.813,6.229,0.84v-0.047l0.005,0.047c2.1-0.026,4.375-0.216,6.229-0.84c-0.625,0.115-1.228-0.552-1.228-1.21	l0.002-6.396c0-0.668-0.132-1.095-0.368-1.677C36.342,44.13,36.41,43.285,37.184,43.111z"></path><path d="M54.461,27.054C51.956,27.326,50,29.423,50,32c0,9.925-8.075,18-18,18	c-2.577,0-4.674,1.957-4.946,4.461C28.648,54.81,30.301,55,32,55c12.703,0,23-10.297,23-23C55,30.301,54.81,28.648,54.461,27.054z" opacity=".15"></path>
                            </svg>
                        </div>
                        Github
                    </div>
                </Col>
            </Row>
            <Row className={styles["sidebar-full-row"]} onClick={()=>router.push(`/`)}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        home
                    </span>
                    Home
                </div>
            </Row>
            <Row className={styles["sidebar-full-row"]}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        search
                    </span>
                    Search
                </div>
            </Row>
            <Row className={styles["sidebar-full-row"]}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        bookmark
                    </span>
                    Favorites
                </div>
            </Row>
            <Row className={styles["sidebar-full-row"]}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        sell
                    </span>
                    Tags
                </div>
            </Row>
            <Row className={styles["sidebar-full-row"]}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        code
                    </span>
                    Language/Course
                </div>
            </Row>
            <Row className={styles["sidebar-full-row"]}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        settings
                    </span>
                    Settings
                </div>
            </Row>
            <Row className={styles["sidebar-full-row"]}>
                <div className={styles["sidebard-full-row-div"]}>
                    <span class="material-symbols-outlined">
                        logout
                    </span>
                    Log Out
                </div>
            </Row>
        </div>
        )
    }

};

export default Sidebar;