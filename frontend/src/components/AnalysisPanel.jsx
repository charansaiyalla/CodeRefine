import { useState } from "react"

export default function AnalysisPanel({ analysis, loading, error, onApplyOptimized }) {
  const [showOptimized, setShowOptimized] = useState(false)

  if (loading) {
    return (
      <div className="analysis-panel center">
        <div className="spinner"></div>
        <p className="loading-text">Analyzing your code...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="analysis-panel">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h3>Analysis Error</h3>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="analysis-panel center">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Ready to Analyze</h3>
          <p>Write your code and click "Refine Code" to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="analysis-panel">
      <div className="analysis-header">
        <h2>Analysis Results</h2>
        <div className="analysis-badges">
          {analysis.errors.length === 0 && (
            <span className="badge badge-success">✓ No Errors</span>
          )}
          {analysis.errors.length > 0 && (
            <span className="badge badge-error">{analysis.errors.length} Error{analysis.errors.length > 1 ? 's' : ''}</span>
          )}
        </div>
      </div>

      {/* Time Complexity */}
      <div className="analysis-card complexity-card">
        <div className="card-header">
          <span className="card-icon">⏱️</span>
          <h3>Time Complexity</h3>
        </div>
        <div className="complexity-badge">
          {analysis.time_complexity}
        </div>
      </div>

      {/* Errors */}
      {analysis.errors.length > 0 && (
        <div className="analysis-card error-card-section">
          <div className="card-header">
            <span className="card-icon">🐛</span>
            <h3>Errors Found</h3>
          </div>
          <ul className="error-list">
            {analysis.errors.map((e, i) => (
              <li key={i} className="error-item">
                <span className="error-bullet">•</span>
                {e}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {analysis.suggestions.length > 0 && (
        <div className="analysis-card suggestions-card">
          <div className="card-header">
            <span className="card-icon">💡</span>
            <h3>Suggestions</h3>
          </div>
          <ul className="suggestions-list">
            {analysis.suggestions.map((s, i) => (
              <li key={i} className="suggestion-item">
                <span className="suggestion-bullet">→</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Optimized Code */}
      {analysis.optimized_code && (
        <div className="analysis-card optimized-card">
          <div className="card-header">
            <span className="card-icon">✨</span>
            <h3>Optimized Code</h3>
          </div>
          
          <div className="optimized-actions">
            <button 
              className="btn-toggle-code"
              onClick={() => setShowOptimized(!showOptimized)}
            >
              {showOptimized ? "Hide Code" : "Show Code"}
            </button>
            <button 
              className="btn-apply-code"
              onClick={() => onApplyOptimized(analysis.optimized_code)}
            >
              <span>⚡</span> Apply to Editor
            </button>
          </div>

          {showOptimized && (
            <pre className="optimized-code-block">
              <code>{analysis.optimized_code}</code>
            </pre>
          )}
        </div>
      )}
    </div>
  )
}
