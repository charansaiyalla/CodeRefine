import { useState } from "react"
import OptimizedModal from "./OptimizedModal"

export default function AnalysisPanel({ analysis, loading, error }) {
  if (loading) {
    return (
      <div className="analysis-panel center">
        <div className="spinner"></div>
        <p>Analyzing code...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="analysis-panel">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="analysis-panel">
        <p>Click “Refine Code” to analyze.</p>
      </div>
    )
  }

  return (
    <div className="analysis-panel">
      <h3>Time Complexity</h3>
      <p>{analysis.time_complexity}</p>

      <h3>Errors</h3>
      {analysis.errors.length === 0
        ? <p>None</p>
        : <ul>{analysis.errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
      }

      <h3>Suggestions</h3>
      <ul>
        {analysis.suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <h3>Optimized Code</h3>
      <pre>{analysis.optimized_code}</pre>
    </div>
  )
}
