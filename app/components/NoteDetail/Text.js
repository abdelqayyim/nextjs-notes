import React, {useRef, useEffect, useState} from 'react'; 
import styles from "./Text.module.css"
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { lucario } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { javascript } from '@codemirror/lang-javascript';


const Text = (props) => {
    const textArea = useRef();
    const [textValue, setTextValue] = useState(props.text);
    // useEffect(() => {
    //     if (textArea.current) {
    //       textArea.current.style.height = 'auto';
    //       textArea.current.style.height = textArea.current.scrollHeight + 'px';
    //     }
    // }, [props.text]);
    const saveHandler = () => {
        // setTextValue(textArea.current.editor.innerText);
        let index = textArea.current.editor.innerText.indexOf("\n");
        console.log(textArea.current.editor.innerText.substring(index + 1));
        console.log(props.save());
    }


//TODO: fix the editor, then fix save note 

    // extensions={[javascript({ jsx: true })]}
    return (
        // <SyntaxHighlighter ref={textArea } children={props.text} language='csharp' style={lucario}/>

        <CodeMirror options={{lineNumbers: false}} ref={textArea} onChange={saveHandler} className={styles.textArea} value={textValue} extensions={[javascript({ jsx: true })]}/>
    )
};

export default Text;