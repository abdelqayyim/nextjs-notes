import React, {useRef, useEffect} from 'react'; 
import styles from "./Text.module.css"
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { lucario } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { javascript } from '@codemirror/lang-javascript';


const Text = (props) => {
    const textArea = useRef();
    useEffect(() => {
        if (textArea.current) {
          textArea.current.style.height = 'auto';
          textArea.current.style.height = textArea.current.scrollHeight + 'px';
        }
    }, [props.text]);

 
    const options = {
        
    }
    // extensions={[javascript({ jsx: true })]}
    return (
        // <SyntaxHighlighter ref={textArea } children={props.text} language='csharp' style={lucario}/>

        <CodeMirror className={styles.textArea} value={props.text} extensions={[javascript({ jsx: true })]}/>
    )
};

export default Text;