import React, { useCallback, useContext } from "react";
import styles from "./LanguageButton.module.css";
// import { ACTIONS, AppProvider } from "../../app/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LanguageButton = (props) => {
  // const curr = useContext(AppProvider); // global context
  const router = useRouter();

  
  //TODO: remove the spaces before passing it to the parameters or else you'll have %

  return (
    <Link href={`/${props.name.replace(/\s/g, "")}`} className={styles.link}>
      <button
      className={styles.btn}
      onClick={props.clicked}
      name={props.name}
      id={props._id}
    >
      {props.name}
    </button>
    </Link>
    
  );
};

export default LanguageButton;
