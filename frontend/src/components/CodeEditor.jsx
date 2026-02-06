import { useState } from "react";
import Editor from "@monaco-editor/react";
import "../styles/Editor.css";

export default function CodeEditor({ onRefine }) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");

  return (
    <div className="code-editor-container">
      
      {/* TOP BAR */}
      <div className="editor-top-bar">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </div>

      {/* MONACO EDITOR (FULL HEIGHT) */}
<div className="code-editor-container">

  <div className="editor-header">
    <select>{/* language */}</select>
    <button onClick={() => onRefine(code, language)}>
  Refine Code
</button>

  </div>

  <div className="editor-wrapper">
    <Editor
      height="100%"
      width="100%"
      theme="vs-dark"
      language={language}
      value={code}
      onChange={(value) => setCode(value)}
    />
  </div>

</div>
    </div>
  );
}
