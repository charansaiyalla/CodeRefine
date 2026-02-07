import { useNavigate } from "react-router-dom"
import "../styles/landing.css"

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing-container">
      {/* NAVIGATION */}
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="nav-icon">⚡</span>
            CodeRefine
          </div>
          <button 
            className="btn-nav-login"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="landing-main">
        {/* KINETIC HERO SECTION */}
        <section className="hero-content">
          <div className="hero-badge">
            ⚡ Powered by Advanced AI Analysis
          </div>
          
          <h1 className="hero-title">
            Transform Your Code with{" "}
            <span className="gradient-text">AI Precision</span>
          </h1>
          
          <p className="hero-description">
            Analyze complexity, detect errors, and optimize performance instantly. 
            Built for developers who demand excellence.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Lines Analyzed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.8%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">&lt;2s</div>
              <div className="stat-label">Avg Response</div>
            </div>
          </div>

          <div className="hero-actions">
            <button 
              className="btn-primary"
              onClick={() => navigate("/login")}
            >
              Get Started
              <span>→</span>
            </button>
            <button 
              className="btn-secondary"
              onClick={() => navigate("/editor")}
            >
              <span>⚡</span>
              Try Demo
            </button>
          </div>

          <div className="hero-note">
            <span>✓</span>
            No credit card required · Free tier available
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🎯</span>
            </div>
            <h3>Instant Analysis</h3>
            <p>
              Real-time complexity detection with O(n) notation. 
              Know your algorithm's performance before deployment.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🔍</span>
            </div>
            <h3>Error Detection</h3>
            <p>
              Catch syntax errors, logic flaws, and edge cases. 
              Ship production-ready code with confidence.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">⚡</span>
            </div>
            <h3>AI Optimization</h3>
            <p>
              Get intelligent refactoring suggestions to improve 
              efficiency and maintainability automatically.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🚀</span>
            </div>
            <h3>Multi-Language</h3>
            <p>
              Support for C++, Java, Python, C, and JavaScript. 
              One platform for all your development needs.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">📊</span>
            </div>
            <h3>Quality Scoring</h3>
            <p>
              Comprehensive metrics from 0-100 measuring code 
              health, readability, and performance.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">💾</span>
            </div>
            <h3>Project Management</h3>
            <p>
              Organize code snippets into projects. Track progress 
              and improvements over time.
            </p>
          </div>
        </section>

        {/* CODE PREVIEW SECTION */}
        <section className="code-preview-section">
          <h2 className="section-title">
            From Messy to Optimized
          </h2>

          <div className="preview-container">
            {/* BEFORE */}
            <div className="preview-window">
              <div className="window-header">
                <div className="window-dots">
                  <div className="dot dot-red"></div>
                  <div className="dot dot-yellow"></div>
                  <div className="dot dot-green"></div>
                </div>
                <div className="window-title">before.cpp</div>
              </div>
              <div className="window-content">
                <pre className="code-sample">{`int sum = 0;
for (int i = 0; i < n; i++) {
  for (int j = 0; j < n; j++) {
    sum += arr[i] * arr[j];
  }
}`}</pre>
              </div>
            </div>

            {/* ARROW */}
            <div className="preview-arrow">→</div>

            {/* AFTER */}
            <div className="preview-results">
              <div className="result-card">
                <div className="result-header">
                  <span>📊</span>
                  Complexity
                </div>
                <div className="result-value">O(n²)</div>
              </div>

              <div className="result-card">
                <div className="result-header">
                  <span>💡</span>
                  Suggestions
                </div>
                <ul className="result-list">
                  <li>Consider caching arr[i]</li>
                  <li>Use single-pass algorithm</li>
                  <li>Reduce nested loops</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section">
          <h2 className="cta-title">
            Ready to Level Up Your Code?
          </h2>
          <p className="cta-description">
            Join thousands of developers optimizing their code with AI
          </p>
          <div className="cta-buttons">
            <button 
              className="btn-cta-primary"
              onClick={() => navigate("/login")}
            >
              Start Free Trial
            </button>
            <button 
              className="btn-cta-secondary"
              onClick={() => navigate("/editor")}
            >
              View Demo
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-brand">
          <span>⚡</span>
          CodeRefine
        </div>
        <p className="footer-text">
          © 2024 CodeRefine. Built with precision for developers.
        </p>
      </footer>
    </div>
  )
}