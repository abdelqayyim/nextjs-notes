import React, {useRef, useEffect, useState} from 'react'; 
import styles from "./Text.module.css"
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const Text = (props) => {
    const parent = useRef();
    const textArea = useRef();
    const highlighter = useRef();
    const [textValue, setTextValue] = useState("");
    const [editing, setEditing] = useState(false);

    useEffect(() => { setTextValue(props.text) }, [props.text]);

    const updateTextHandler = (event,newText) => {
        props.save(props.index, {text: newText});
        setTextValue(prev => newText);
        setHeightHandler(event.target);
    }
    const setHeightHandler = (target) => {
        target.addEventListener('input', function () {
            this.style.height = 'auto';  /* Reset height to auto */
            this.style.height = this.scrollHeight +10 + 'px';  /* Set height based on content */
          });
    }
    useEffect(() => {
        if (editing) {
            // setHeightHandler(textArea.current);
            textArea.current.style.height = 'auto';  /* Reset height to auto */
            textArea.current.style.height = textArea.current.scrollHeight +10 + 'px';  /* Set height based on content */
        }
        else {
            //TODO: set cursor pointer on syntaxhighlighter
            // highlighter.current.style.pointerEvents = 'none';
            
        }
        
    }, [editing, textValue])
    
    const moveHandler = (event) => {
        event.preventDefault();
        props.move(props.index);
    }
    const deleteHandler = (event) => {
        event.preventDefault();
        props.delete(props.index);
    }
    const toggleEdit = (event) => {
        event.preventDefault();
        setEditing(prev=>!prev);
    }
    

return (
    <div ref={parent} className={styles.parent}>
        
            <div className={styles.extras}>
            <div onMouseDown={toggleEdit}>{editing == false?<span class="material-symbols-outlined">edit</span>:<span class="material-symbols-outlined">
check_box
</span> }</div>
                {props.index != 0 && <div onMouseDown={moveHandler}><span class="material-symbols-outlined">expand_less</span></div>}
            <div onMouseDown={deleteHandler}><span class="material-symbols-outlined">delete_forever</span></div>
        </div>
        
         {editing== true && <textArea onClick={(event)=>setHeightHandler(event.target)} ref={textArea} wrap="off" className={`${styles.textArea} ${textValue.includes(`"`)|| textValue.includes("`")?styles.quote: ""}`}  value={textValue} onChange={(event)=>updateTextHandler(event,event.target.value)}>{textValue}</textArea>}   
        
        {editing == false &&
            <div ref={highlighter} className={styles.highlighter}>
                <SyntaxHighlighter  style={docco} showLineNumbers={true} language="javascript">
                    {textValue}
                </SyntaxHighlighter>
            </div>
        }
    </div>
  );
};

export default Text;