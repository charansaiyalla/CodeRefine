import { useState } from "react"
import CodeEditor from "../components/CodeEditor"
import AnalysisPanel from "../components/AnalysisPanel"
import "../styles/editor.css"

export default function Editor() {
  const project = JSON.parse(localStorage.getItem("currentProject"))

  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

const refineCode = async (code, language) => {
  setLoading(true)
  setError(null)

  try {
    const res = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: code,
        language: language
      })
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Analysis failed")
    }

    setAnalysis(data)
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="editor-layout">
      <div className="editor-project-header">
        <h2>{project?.name || "Untitled Project"}</h2>
      </div>

      <CodeEditor onRefine={refineCode} />

      <AnalysisPanel
        analysis={analysis}
        loading={loading}
        error={error}
      />
    </div>
  )
}
