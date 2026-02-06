import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/login"
import Dashboard from "./pages/Dashboard"
import EditorPage from "./pages/editor"
import "./App.css"

// Protected Route Component
function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("auth")
  return auth === "true" ? children : <Navigate to="/" />
}

// Auth Route Component (redirect if already logged in)
function AuthRoute({ children }) {
  const auth = localStorage.getItem("auth")
  return auth === "true" ? <Navigate to="/dashboard" /> : children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoute><Landing /></AuthRoute>} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/editor" 
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App