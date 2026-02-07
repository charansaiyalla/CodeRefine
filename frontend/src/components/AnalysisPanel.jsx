import { useState, useEffect } from "react"
import Speedometer from "./Speedometer"

export default function AnalysisPanel({ analysis, loading, error, onApplyOptimized }) {
  const [showOptimized, setShowOptimized] = useState(false)
  const [activeTab, setActiveTab] = useState("time") // time or space

  if (loading) {
    return (
      <div className="analysis-panel center">
        <div className="spinner"></div>
        <p className="loading-text">Analyzing your code...</p>
        <p className="loading-subtext">This may take a few seconds</p>
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
          <div className="empty-features">
            <div className="empty-feature">
              <span>⚡</span>
              <span>Instant complexity analysis</span>
            </div>
            <div className="empty-feature">
              <span>🐛</span>
              <span>Error detection</span>
            </div>
            <div className="empty-feature">
              <span>💡</span>
              <span>Smart suggestions</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="analysis-panel">
      <div className="analysis-header">
        <h2>Analysis Results</h2>
        <div className="analysis-badges">
          {analysis.errors && analysis.errors.length === 0 && (
            <span className="badge badge-success">✓ No Errors</span>
          )}
          {analysis.errors && analysis.errors.length > 0 && (
            <span className="badge badge-error">{analysis.errors.length} Error{analysis.errors.length > 1 ? 's' : ''}</span>
          )}
        </div>
      </div>

      {/* SPEEDOMETER - Code Quality Score */}
      {analysis.quality_score !== undefined && (
        <div className="analysis-card speedometer-card">
          <div className="card-header">
            <span className="card-icon">🎯</span>
            <h3>Code Quality Score</h3>
          </div>
          <Speedometer score={analysis.quality_score} />
        </div>
      )}

      {/* COMPLEXITY TABS - LeetCode Style - ALWAYS SHOW */}
      <div className="analysis-card complexity-tabs-card">
        <div className="complexity-tabs">
          <button 
            className={`tab-btn ${activeTab === 'time' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('time')}
          >
            <span className="tab-icon">⏱️</span>
            Time
          </button>
          <button 
            className={`tab-btn ${activeTab === 'space' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('space')}
          >
            <span className="tab-icon">💾</span>
            Space
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'time' && (
            <div className="complexity-display">
              <div className="complexity-label">Time Complexity</div>
              <div className="complexity-value">
                {analysis.time_complexity || "Not analyzed"}
              </div>
            </div>
          )}
          {activeTab === 'space' && (
            <div className="complexity-display">
              <div className="complexity-label">Space Complexity</div>
              <div className="complexity-value">
                {analysis.space_complexity || "Not analyzed"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ERRORS */}
      {analysis.errors && analysis.errors.length > 0 && (
        <div className="analysis-card error-card-section">
          <div className="card-header">
            <span className="card-icon">🐛</span>
            <h3>Errors Found</h3>
          </div>
          <ul className="bullet-list error-list">
            {analysis.errors.map((e, i) => (
              <li key={i} className="bullet-item error-item">
                {e}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SUGGESTIONS */}
      {analysis.suggestions && analysis.suggestions.length > 0 && (
        <div className="analysis-card suggestions-card">
          <div className="card-header">
            <span className="card-icon">💡</span>
            <h3>Suggestions</h3>
          </div>
          <ul className="bullet-list suggestions-list">
            {analysis.suggestions.map((s, i) => (
              <li key={i} className="bullet-item suggestion-item">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* OPTIMIZED CODE */}
      {analysis.optimized_code && analysis.optimized_code !== "Not available" && (
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