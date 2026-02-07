import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/login.css"

export default function Login() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const navigate = useNavigate()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("All fields are required")
      return
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || []

      if (isSignup) {
        const exists = users.find((u) => u.email === email)
        if (exists) {
          setError("An account with this email already exists")
          setIsLoading(false)
          return
        }

        users.push({ email, password })
        localStorage.setItem("users", JSON.stringify(users))
        setError("")
        
        // Show success and switch to login
        const successMsg = document.createElement('div')
        successMsg.className = 'success-notification'
        successMsg.innerHTML = '<span>✓</span> Account created successfully!'
        document.body.appendChild(successMsg)
        
        setTimeout(() => {
          successMsg.remove()
          setIsSignup(false)
          setPassword("")
          setConfirmPassword("")
        }, 2000)
        
        setIsLoading(false)
        return
      }

      const validUser = users.find(
        (u) => u.email === email && u.password === password
      )

      if (!validUser) {
        setError("Invalid email or password")
        setIsLoading(false)
        return
      }

      localStorage.setItem("auth", "true")
      localStorage.setItem("currentUser", email)
      localStorage.removeItem("guestMode")
      setIsLoading(false)
      navigate("/dashboard")
    }, 1000)
  }

  const toggleMode = () => {
    setIsSignup(!isSignup)
    setError("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="auth-container">
      {/* LEFT SIDE - ENHANCED BRANDING */}
      <div className="auth-branding">
        <div className="branding-content">
          <div className="brand-logo">
            <div className="logo-icon">⚡</div>
            <h1 className="brand-name">SyntaXstitch</h1>
          </div>
          
          <h2 className="brand-tagline">
            Transform Your Code with AI Precision
          </h2>
          
          <p className="brand-description">
            Analyze, optimize, and refine your code instantly with cutting-edge AI technology. 
            Get instant feedback on time complexity, errors, and receive intelligent suggestions 
            that elevate your development workflow.
          </p>
          
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <div>
                <h4>Instant Analysis</h4>
                <p>Get real-time code insights with advanced AI-powered complexity detection</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <div>
                <h4>AI Optimization</h4>
                <p>Smart code improvements that enhance performance and maintainability</p>
              </div>
            </div>
            
            <div className="feature-item">
              <span className="feature-icon">🚀</span>
              <div>
                <h4>Multi-Language Support</h4>
                <p>Comprehensive support for C++, Java, Python, JavaScript, and more</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - ENHANCED AUTH FORM */}
      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="form-header">
            <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
            <p>
              {isSignup 
                ? "Start optimizing your code today with AI-powered insights" 
                : "Sign in to continue your development journey"
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-banner">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  disabled={isLoading}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                />
              </div>
            </div>

            {isSignup && (
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedInput('confirm')}
                    onBlur={() => setFocusedInput(null)}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-small"></span>
                  {isSignup ? "Creating Account..." : "Signing In..."}
                </>
              ) : (
                <>
                  {isSignup ? "Create Account" : "Sign In"}
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="form-footer">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              {" "}
              <span className="toggle-link" onClick={toggleMode}>
                {isSignup ? "Sign In" : "Create Account"}
              </span>
            </p>
          </div>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <button className="btn-social" type="button">
              <span className="social-icon">G</span>
              Google
            </button>
            <button className="btn-social" type="button">
              <span className="social-icon">⚡</span>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}