import React, {useRef} from "react";
import styles from "./NoteText.module.css";

// import Prism from "prismjs";
// import "../Themes/prismc.css";
import ShiftBtn from "./ShiftBtn";

// import "prismjs/components/prism-python";
// import "prismjs/components/prism-c";
// import "prismjs/components/prism-cpp";
// import "prismjs/components/prism-csharp";
// import "prismjs/components/prism-sql";
// import "prismjs/components/prism-git";
// import "prismjs/components/prism-jsx";
// import "prismjs/components/prism-java";
// import "prismjs/components/prism-sass";
// import "prismjs/components/prism-markdown";
// import "prismjs/components/prism-swift";
// import "prismjs/components/prism-typescript";

const NoteText = (props) => {
  let lang = props.language
  if (lang === "c#") {
    lang = 'csharp'
  }
  else if (lang === "c++") {
    lang = 'cpp';
  }
    const inputText = useRef();
    const output = useRef();
  const pre = useRef();

    const update = (text) => {
        let result_element = output.current;
        // Handle final newlines (see article)
        if (text[text.length - 1] === "\n") {
          // If the last character is a newline character
          text += " "; // Add a placeholder space character to the final line
        }
        // Update code
        result_element.innerHTML = text
          .replace(new RegExp("&", "g"), "&")
          .replace(new RegExp("<", "g"), "<"); /* Global RegExp */
        // Syntax Highlight
        Prism.highlightElement(result_element);

        let inputBoxes = document.querySelectorAll(".input-box");
        inputBoxes.forEach(box => {
        box.style.height = "1px";
        box.style.height = (25 + box.scrollHeight) + "px";
      })
    };
    const checkKey = (element, e) => {
        let code = element.value;
        if (e.key === "Tab") {
          /* Tab key pressed */
          e.preventDefault(); // stop normal
          let before_tab = code.slice(0, element.selectionStart); // text before tab
          let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
          let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
          element.value = before_tab + "\t" + after_tab; // add tab char
          // move cursor
          element.selectionStart = cursor_pos;
          element.selectionEnd = cursor_pos;
          update(element.value); // Update text to include indent
        }
        else if (e.key === "(") {
            console.log("Parantheses was pressed");
            e.preventDefault(); // stop normal
          let before_paranthesis = code.slice(0, element.selectionStart); // text before tab
          let after_paranthesis = code.slice(element.selectionEnd, element.value.length); // text after tab
          let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
          element.value = before_paranthesis + "()" + after_paranthesis; // add tab char
          // move cursor
          element.selectionStart = cursor_pos;
          element.selectionEnd = cursor_pos;
          update(element.value); // Update text to include indent
        }
        else if (e.key === `"`) {
            console.log("Parantheses was pressed");
            e.preventDefault(); // stop normal
          let before_paranthesis = code.slice(0, element.selectionStart); // text before tab
          let after_paranthesis = code.slice(element.selectionEnd, element.value.length); // text after tab
          let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
          element.value = before_paranthesis + `""` + after_paranthesis; // add tab char
          // move cursor
          element.selectionStart = cursor_pos;
          element.selectionEnd = cursor_pos;
          update(element.value); // Update text to include indent
        }
        else if (e.key === `'`) {
          console.log("Parantheses was pressed");
          e.preventDefault(); // stop normal
        let before_paranthesis = code.slice(0, element.selectionStart); // text before tab
        let after_paranthesis = code.slice(element.selectionEnd, element.value.length); // text after tab
        let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
        element.value = before_paranthesis + `''` + after_paranthesis; // add tab char
        // move cursor
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        update(element.value); // Update text to include indent
        }
        else if (e.key === `[`) {
          console.log("Parantheses was pressed");
          e.preventDefault(); // stop normal
        let before_paranthesis = code.slice(0, element.selectionStart); // text before tab
        let after_paranthesis = code.slice(element.selectionEnd, element.value.length); // text after tab
        let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
        element.value = before_paranthesis + `[]` + after_paranthesis; // add tab char
        // move cursor
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        update(element.value); // Update text to include indent
        }
        else if (e.key === `{`) {
          console.log("Parantheses was pressed");
          e.preventDefault(); // stop normal
        let before_paranthesis = code.slice(0, element.selectionStart); // text before tab
        let after_paranthesis = code.slice(element.selectionEnd, element.value.length); // text after tab
        let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
        element.value = before_paranthesis + `{}` + after_paranthesis; // add tab char
        // move cursor
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        update(element.value); // Update text to include indent
      }
    };

    const syncScroll = (element) => {
        let res = pre.current;
        res.scrollTop = element.scrollTop;
        res.scrollLeft = element.scrollLeft;
    };
  const move = () => {
    props.onMoveUp(props.index)
  }

  return (
    <div className="textbox-container">
      <ShiftBtn move={move} className="textShift"></ShiftBtn>
      <textarea type="text"
            className="input-box detail"
              onInput={() => update(inputText.current.value)}
              onKeyDown={(e) => checkKey(inputText.current, e)}
            wrap="off"
        ref={inputText}
        placeholder="Insert code here"
        onScroll={() => syncScroll(inputText.current)}
      onFocus="true">
        {props.codeText}
        </textarea>

      <pre className={`language-${lang}`} ref={pre}>
            <code ref={output}>{props.codeText}</code>
        </pre>

    </div>
  );
};

export default NoteText;
// TODO: add a button to the images and the text boxes so you an press it and move thier positions