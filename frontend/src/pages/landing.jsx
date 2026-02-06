import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import "../styles/landing.css"

export default function Landing() {
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already logged in
    const auth = localStorage.getItem("auth")
    if (auth === "true") {
      navigate("/dashboard")
    }
  }, [navigate])

  const handleInstantAccess = () => {
    // Set guest mode
    localStorage.setItem("guestMode", "true")
    localStorage.setItem("auth", "true")
    navigate("/editor")
  }

  return (
    <div className="landing-container">
      {/* Animated Background */}
      <div className="landing-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-grid"></div>
      </div>

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="nav-icon">⚡</span>
            <span className="nav-brand">CodeRefine</span>
          </div>
          <button 
            className="btn-nav-login"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="landing-main">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-icon">✨</span>
            <span>AI-Powered Code Analysis</span>
          </div>

          <h1 className="hero-title">
            Transform Your Code
            <span className="gradient-text"> with AI</span>
          </h1>

          <p className="hero-description">
            Analyze, optimize, and refine your code instantly. Get real-time insights on 
            time complexity, detect errors, and receive intelligent suggestions to write better code.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">⚡ Instant</div>
              <div className="stat-label">Analysis</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">4+</div>
              <div className="stat-label">Languages</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">AI</div>
              <div className="stat-label">Powered</div>
            </div>
          </div>

          <div className="hero-actions">
            <button 
              className="btn-primary"
              onClick={handleInstantAccess}
            >
              <span className="btn-icon">🚀</span>
              Try Instantly - No Sign Up
              <span className="btn-arrow">→</span>
            </button>

            <button 
              className="btn-secondary"
              onClick={() => navigate("/login")}
            >
              <span className="btn-icon">✨</span>
              Create Free Account
            </button>
          </div>

          <div className="hero-note">
            <span className="note-icon">💡</span>
            <span>Instant mode: Try immediately without account. Create account to save projects.</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🎯</span>
            </div>
            <h3>Instant Analysis</h3>
            <p>Get real-time feedback on your code's time complexity and performance</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🐛</span>
            </div>
            <h3>Error Detection</h3>
            <p>Automatically identify bugs, syntax errors, and potential issues</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">💡</span>
            </div>
            <h3>Smart Suggestions</h3>
            <p>Receive AI-powered recommendations to improve your code quality</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">⚡</span>
            </div>
            <h3>Code Optimization</h3>
            <p>Get optimized versions of your code with one-click application</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🌐</span>
            </div>
            <h3>Multi-Language</h3>
            <p>Support for C++, C, Java, Python, and more languages</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">📊</span>
            </div>
            <h3>Project Management</h3>
            <p>Organize and save your code projects for future reference</p>
          </div>
        </div>

        {/* Code Preview */}
        <div className="code-preview-section">
          <h2 className="section-title">See It In Action</h2>
          <div className="preview-container">
            <div className="preview-window">
              <div className="window-header">
                <div className="window-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="window-title">main.cpp</span>
              </div>
              <div className="window-content">
                <pre className="code-sample">
{`void bubbleSort(int arr[], int n) {
    for(int i = 0; i < n-1; i++) {
        for(int j = 0; j < n-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}`}
                </pre>
              </div>
            </div>

            <div className="preview-arrow">→</div>

            <div className="preview-results">
              <div className="result-card">
                <div className="result-header">
                  <span className="result-icon">⏱️</span>
                  <span>Time Complexity</span>
                </div>
                <div className="result-value">O(n²)</div>
              </div>

              <div className="result-card">
                <div className="result-header">
                  <span className="result-icon">💡</span>
                  <span>Suggestions</span>
                </div>
                <ul className="result-list">
                  <li>Consider using quicksort for better average performance</li>
                  <li>Add early termination for sorted arrays</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Write Better Code?</h2>
            <p className="cta-description">
              Join developers who are already optimizing their code with AI
            </p>
            <div className="cta-buttons">
              <button 
                className="btn-cta-primary"
                onClick={handleInstantAccess}
              >
                Start Coding Now
              </button>
              <button 
                className="btn-cta-secondary"
                onClick={() => navigate("/login")}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-icon">⚡</span>
            <span>CodeRefine</span>
          </div>
          <p className="footer-text">AI-powered code analysis and optimization</p>
        </div>
      </footer>
    </div>
  )
}