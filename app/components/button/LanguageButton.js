import React, { useCallback, useContext } from "react";
import styles from "./LanguageButton.module.css";
import { ACTIONS, AppProvider } from "../../app/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LanguageButton = (props) => {
  const curr = useContext(AppProvider); // global context
  const router = useRouter();

  const languageButtonHandler = () => {
    //change the global current language everytime a new language is pressed
    // curr.callDispatch({ type: ACTIONS.CHANGE_CURRENT_LANGUAGE, payload: { language: props.name } });
    // props.moveUp(); //move the app title and the buttons up (animation)
    // curr.fetchNotes(props.name.toLowerCase());

    // router.push('/notes/');
  };

  const correspondsToCurrentLanguage =
    curr.currentLanguage !== undefined &&
    curr.currentLanguage.toLowerCase() === props.name.toLowerCase();
  const classname = correspondsToCurrentLanguage
    ? `${styles.btn} ${styles.selected} ${curr.currentAppMode}`
    : `${styles.btn} ${styles[curr.currentAppMode]}`;

  return (
    <Link href="/notes">
      <button
      className={classname}
      onClick={languageButtonHandler}
      name={props.name}
      id={props._id}
    >
      {props.name}
    </button>
    </Link>
    
  );
};

export default LanguageButton;
