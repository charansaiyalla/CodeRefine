import { useState } from "react";
import Editor from "@monaco-editor/react";
import "../styles/editor.css";

export default function CodeEditor({ onRefine, code, setCode }) {
  const [language, setLanguage] = useState("cpp");

  return (
    <div className="code-editor-container">
      
      {/* HEADER */}
      <div className="editor-header">
        <div className="editor-controls">
          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>

          <button
            className="btn-refine"
            onClick={() => {
              if (!code.trim()) {
                alert("Please enter some code");
                return;
              }
              onRefine(code, language);
            }}
          >
            <span className="btn-icon">🔍</span>
            Refine Code
          </button>
        </div>
      </div>

      {/* MONACO EDITOR */}
      <div className="editor-wrapper">
        <Editor
          height="100%"
          theme="vs-dark"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
          }}
        />
      </div>

    </div>
  );
}
