import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./DropArrow.module.css";
// import { ACTIONS, AppProvider } from "../../app/AppContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const DropArrow = (props) => {
  // const curr = useContext(AppProvider);
  let [isActive, setIsActive] = useState(false);
  let button = useRef();
  let options = useRef();
  let icon = useRef();

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!button.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  });

  const addLanguageHandler = () => {
    // curr.callDispatch({ type: ACTIONS.TOGGLE_ADD_LANGUAGE_POPUP });
  };
  const deleteLanguageHandler = () => {
    // curr.callDispatch({ type: ACTIONS.TOGGLE_DELETE_LANGUAGE_POPUP });
  };
  const arrowClickHandler = (e) => {
    setIsActive((prev) => !prev);
  };

  return (
    <Fragment>
      <div
        className={`${styles["btn-dropdown"]}`}
        ref={button}
      >
        <button
          className={`${styles.arrowBtn} `}
          onClick={(e) => arrowClickHandler(e)}
        >
          {/* <div className={styles.arrow}>
                        { isActive? <FontAwesomeIcon icon={faAngleUp} className={`${styles.arrow}`} />: <FontAwesomeIcon icon={faAngleDown} className={`${styles.arrow}`} />}
                    </div> */}
        </button>
        <ul
          className={
            isActive
              ? `${styles.dropInfo} ${styles.active} `
              : `${styles.dropInfo}`
          }
          ref={options}
        >
          <li
            className={`${styles["add-languageOption"]}`}
            onClick={addLanguageHandler}
          >
            Add Language
          </li>
          <li
            className={`${styles["delete-languagegOption"]}`}
            onClick={deleteLanguageHandler}
          >
            Delete Language
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default DropArrow;
