import Editor from "@monaco-editor/react"

export default function OptimizedModal({ code, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Optimized Code</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <Editor
          height="400px"
          language="cpp"
          theme="vs-dark"
          value={code}
          options={{
            readOnly: true,
            minimap: { enabled: false }
          }}
        />
      </div>
    </div>
  )
}
