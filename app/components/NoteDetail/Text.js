import React, { useEffect, useState } from 'react'; 
import NoteDetailTag from './NoteDetailTag';
import Editor, { useMonaco } from '@monaco-editor/react';
import CloseIcon from '@mui/icons-material/Close';

const Text = ({ detail, index, ref, updateText, removeElement}) => {
  const monaco = useMonaco();
  const [code, setCode] = useState(detail.content);
  const [language, setLanguage] = useState(detail?.language? detail.language : "javascript");
  const supportedLanguageList = [
    { name: "javascript", displayName: "JavaScript", onAction:()=> {setLanguage("javascript"); updateText("javascript", index, "language");}},
    { name: "python", displayName: "Python", onAction:()=> {setLanguage("python"); updateText("python", index, "language");}},
    { name: "typescript", displayName: "TypeScript", onAction:()=> {setLanguage("typescript"); updateText("typescript", index, "language");}},
    { name: "csharp", displayName: "C#", onAction:()=> {setLanguage("csharp"); updateText("csharp", index, "language");}},
    { name: "c++", displayName: "C++", onAction:()=> {setLanguage("c++"); updateText("c++", index, "language");}},
    { name: "markdown", displayName: "Markdown", onAction:()=> {setLanguage("markdown"); updateText("markdown", index, "language");}},
    { name: "java", displayName: "Java", onAction:()=> {setLanguage("java"); updateText("java", index, "language");}},
    { name: "ruby", displayName: "Ruby", onAction:()=> {setLanguage("ruby"); updateText("ruby", index, "language");}},
    { name: "sass", displayName: "SASS" , onAction:()=> {setLanguage("sass"); updateText("sass", index, "language");}},
    { name: "r", displayName: "R", onAction:()=> {setLanguage("r"); updateText("r", index, "language");}},
  ];

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('my-custom-theme', {
        base: 'vs-dark', // can be 'vs', 'vs-dark' or 'hc-black'
        inherit: true,
        rules: [
          { background: '1E1E1E' },
          { token: 'comment', foreground: '6A9955' },
          { token: 'keyword', foreground: 'C586C0' },
          { token: 'string', foreground: 'CE9178' },
        ],
        colors: {
          'editor.background': '#1E1E1E',
          'editor.foreground': '#D4D4D4',
        },
      });

      monaco.editor.setTheme('my-custom-theme');
    }
  }, [monaco]);
  const [editorHeight, setEditorHeight] = useState(50); // Initial height in pixels
  const lineHeight = 20; // Adjust based on Monaco Editor's line height

  // Function to adjust height based on the number of lines, respecting the maximum height
  const adjustEditorHeight = (editor) => {
    const lineCount = editor.getModel().getLineCount();
    const newHeight = Math.min(lineCount * lineHeight, 400); // Cap height at 400px
    setEditorHeight(newHeight);
  };

  useEffect(() => {
    // Whenever the `temporaryTextsRef` is updated externally, sync it with `code`
    if (ref && ref.current) {
      const currentText = ref.current[index]?.content || '';
      setCode(currentText); // Sync code with the ref if needed
    }
  }, [ref.current, index]);
  // backgroundColor: "#EFEDED"
  return (
    <div style={{ position:"relative", overflow:"visible", borderRadius: "10px", backgroundColor: "#EFEDED", paddingLeft: "5px", paddingBottom:"10px", flexGrow:"1", marginTop:"10px" }}>
      <div style={{ height: "25px", display: "flex", justifyContent: "space-between", paddingRight: "5px" }}>
        <CloseIcon onClick={()=> removeElement(index)}/>
        <NoteDetailTag options={supportedLanguageList} currentLanguage={language}/>
      </div>
      <div style={{ flexGrow: 1, overflow: "hidden", maxHeight: "400px" }}> {/* Set maxHeight here */}
        <Editor
          height={`${editorHeight}px`} // Set dynamic height with a cap
          language={language}
          theme="my-custom-theme"
          value={code}
          onChange={(newValue) => {
            setCode(newValue || '');
            updateText(newValue, index, "text")
          }}
          options={{
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            automaticLayout: true,
            // Adjust height on initial load
            readOnly: false,
          }}
          onMount={(editor) => {
            // Adjust height on initial load
            adjustEditorHeight(editor);
            // Listen to content changes to adjust height
            editor.onDidChangeModelContent(() => adjustEditorHeight(editor));
          }}
        />
      </div>
    </div>
  );
};

export default Text;
