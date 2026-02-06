import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/login.css"

export default function Login() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSubmit = () => {
    if (!email || !password) {
      setError("All fields are required")
      return
    }

    if (!emailRegex.test(email)) {
      setError("Enter a valid email")
      return
    }

    const users = JSON.parse(localStorage.getItem("users")) || []

    if (isSignup) {
      const exists = users.find((u) => u.email === email)
      if (exists) {
        setError("Account already exists")
        return
      }

      users.push({ email, password })
      localStorage.setItem("users", JSON.stringify(users))
      setError("")
      alert("Account created! Please login.")
      setIsSignup(false)
      return
    }

    const validUser = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!validUser) {
      setError("Invalid credentials")
      return
    }

    localStorage.setItem("auth", "true")
    navigate("/dashboard")
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>CodeRefine</h1>
        <p>{isSignup ? "Create an account" : "Welcome back"}</p>

        {error && <p className="error-text">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {isSignup ? "Sign Up" : "Sign In"}
        </button>

        <span onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have an account? Sign in"
            : "New user? Create an account"}
        </span>
      </div>
    </div>
  )
}
