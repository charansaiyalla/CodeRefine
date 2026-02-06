import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/dashboard.css"

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [currentUser, setCurrentUser] = useState("")
  const [isGuest, setIsGuest] = useState(false)
  const navigate = useNavigate()

  // Get current user's projects key
  const getProjectsKey = () => {
    if (isGuest) return "guest_projects"
    return `projects_${currentUser}`
  }

  const deleteProject = (id, e) => {
    e.stopPropagation() // Prevent opening project when deleting
    
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    )

    if (!confirmDelete) return

    const updated = projects.filter((p) => p.id !== id)
    setProjects(updated)
    localStorage.setItem(getProjectsKey(), JSON.stringify(updated))
  }

  useEffect(() => {
    // Check if user is logged in
    const auth = localStorage.getItem("auth")
    if (auth !== "true") {
      navigate("/")
      return
    }

    // Check if guest mode
    const guestMode = localStorage.getItem("guestMode")
    const user = localStorage.getItem("currentUser")
    
    if (guestMode === "true") {
      setIsGuest(true)
      setCurrentUser("guest")
    } else if (user) {
      setCurrentUser(user)
    } else {
      // No valid session
      navigate("/")
      return
    }
  }, [navigate])

  useEffect(() => {
    if (!currentUser) return
    
    const projectsKey = getProjectsKey()
    const saved = JSON.parse(localStorage.getItem(projectsKey)) || []
    setProjects(saved)
  }, [currentUser])

  const createProject = () => {
    if (!projectName.trim()) return

    const newProject = {
      id: Date.now(),
      name: projectName,
      createdAt: new Date().toLocaleDateString(),
      owner: currentUser
    }

    const updated = [...projects, newProject]
    setProjects(updated)
    localStorage.setItem(getProjectsKey(), JSON.stringify(updated))

    setProjectName("")
    setShowModal(false)
  }

  const openProject = (project) => {
    localStorage.setItem("currentProject", JSON.stringify(project))
    navigate("/editor")
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">
              <span className="title-icon">⚡</span>
              CodeRefine
            </h1>
            <p className="dashboard-subtitle">
              {isGuest ? (
                <>👤 Guest Mode - <span style={{color: '#f59e0b'}}>Create an account to save projects permanently</span></>
              ) : (
                <>Your AI-powered code optimization workspace • {currentUser}</>
              )}
            </p>
          </div>
          <button
            className="btn-logout"
            onClick={() => {
              localStorage.removeItem("auth")
              localStorage.removeItem("currentUser")
              localStorage.removeItem("guestMode")
              navigate("/")
            }}
          >
            <span>👋</span> {isGuest ? "Exit Guest Mode" : "Logout"}
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="projects-header">
          <div>
            <h2>My Projects</h2>
            <p className="projects-count">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
          </div>
          <button className="btn-new-project" onClick={() => setShowModal(true)}>
            <span className="plus-icon">+</span> New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="empty-projects">
            <div className="empty-icon">📁</div>
            <h3>No projects yet</h3>
            <p>Create your first project to get started!</p>
            <button className="btn-create-first" onClick={() => setShowModal(true)}>
              Create Project
            </button>
          </div>
        ) : (
          <div className="project-grid">
            {projects.map((p) => (
              <div 
                key={p.id} 
                className="project-card"
                onClick={() => openProject(p)}
              >
                <div className="project-card-header">
                  <div className="project-icon">📝</div>
                  <button
                    className="btn-delete"
                    onClick={(e) => deleteProject(p.id, e)}
                    title="Delete project"
                  >
                    <span>🗑️</span>
                  </button>
                </div>
                <div className="project-info">
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-date">Created {p.createdAt || 'Recently'}</p>
                </div>
                <div className="project-footer">
                  <span className="open-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Project</h3>
              <button 
                className="btn-close-modal"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <label htmlFor="project-name">Project Name</label>
              <input
                id="project-name"
                type="text"
                placeholder="e.g., Algorithm Optimizer"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && createProject()}
                autoFocus
              />
            </div>
            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-create"
                onClick={createProject}
                disabled={!projectName.trim()}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}