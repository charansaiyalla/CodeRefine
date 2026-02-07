import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/dashboard.css"

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [currentUser, setCurrentUser] = useState("")
  const [isGuest, setIsGuest] = useState(false)
  const [activeTab, setActiveTab] = useState("projects") // projects, analytics, settings, profile
  const navigate = useNavigate()

  // Get current user's projects key
  const getProjectsKey = () => {
    if (isGuest) return "guest_projects"
    return `projects_${currentUser}`
  }

  const deleteProject = (id, e) => {
    e.stopPropagation()
    
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
      lastModified: new Date().toLocaleDateString(),
      filesCount: 0,
      language: "cpp",
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

  // Calculate analytics
  const analytics = {
    totalProjects: projects.length,
    codeAnalyzed: projects.reduce((sum, p) => sum + (p.filesCount || 0), 0),
    lastActive: projects.length > 0 ? projects[0].lastModified : "N/A",
    avgQuality: projects.length > 0 ? 75 : 0
  }

  return (
    <div className="dashboard">
      {/* HEADER */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">
              <span className="title-icon">⚡</span>
              CodeRefine
            </h1>
            <p className="dashboard-subtitle">
              {isGuest ? (
                <>👤 Guest Mode - <span className="warning-text">Create account to save permanently</span></>
              ) : (
                <>{currentUser}</>
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
            <span>👋</span> {isGuest ? "Exit" : "Logout"}
          </button>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* SIDEBAR */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === 'projects' ? 'nav-active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <span className="nav-icon">📁</span>
              <span>Projects</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'analytics' ? 'nav-active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <span className="nav-icon">📊</span>
              <span>Analytics</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'nav-active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span className="nav-icon">⚙️</span>
              <span>Settings</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'profile' ? 'nav-active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <span className="nav-icon">👤</span>
              <span>Profile</span>
            </button>
          </nav>

          {/* Quick Actions */}
          <div className="sidebar-footer">
            <button 
              className="btn-quick-action"
              onClick={() => navigate("/editor")}
            >
              <span>🚀</span>
              Quick Code
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="dashboard-main">
          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="tab-content fade-in">
              <div className="content-header">
                <div>
                  <h2>My Projects</h2>
                  <p className="content-subtitle">{projects.length} project{projects.length !== 1 ? 's' : ''} total</p>
                </div>
                <button className="btn-new-project" onClick={() => setShowModal(true)}>
                  <span>+</span> New Project
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📂</div>
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
                      <div className="project-header">
                        <div className="project-icon">
                          {p.language === 'cpp' ? '⚙️' : 
                           p.language === 'python' ? '🐍' :
                           p.language === 'java' ? '☕' : '📝'}
                        </div>
                        <button
                          className="btn-delete"
                          onClick={(e) => deleteProject(p.id, e)}
                        >
                          🗑️
                        </button>
                      </div>
                      <h3 className="project-name">{p.name}</h3>
                      <div className="project-meta">
                        <span>📅 {p.createdAt}</span>
                        <span>📝 {p.filesCount || 0} files</span>
                      </div>
                      <div className="project-footer">
                        <span className="project-language">{p.language}</span>
                        <span className="project-arrow">→</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <div className="tab-content fade-in">
              <div className="content-header">
                <h2>Analytics</h2>
                <p className="content-subtitle">Your coding insights</p>
              </div>

              <div className="analytics-grid">
                <div className="stat-card">
                  <div className="stat-icon">📁</div>
                  <div className="stat-content">
                    <div className="stat-value">{analytics.totalProjects}</div>
                    <div className="stat-label">Total Projects</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">📝</div>
                  <div className="stat-content">
                    <div className="stat-value">{analytics.codeAnalyzed}</div>
                    <div className="stat-label">Files Analyzed</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-content">
                    <div className="stat-value">{analytics.avgQuality}%</div>
                    <div className="stat-label">Avg Quality Score</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-content">
                    <div className="stat-value">{analytics.lastActive}</div>
                    <div className="stat-label">Last Active</div>
                  </div>
                </div>
              </div>

              <div className="analytics-chart">
                <h3>Language Distribution</h3>
                <div className="language-bars">
                  <div className="language-bar">
                    <div className="bar-label">C++</div>
                    <div className="bar-container">
                      <div className="bar-fill" style={{width: '60%'}}></div>
                    </div>
                    <div className="bar-value">60%</div>
                  </div>
                  <div className="language-bar">
                    <div className="bar-label">Python</div>
                    <div className="bar-container">
                      <div className="bar-fill" style={{width: '25%'}}></div>
                    </div>
                    <div className="bar-value">25%</div>
                  </div>
                  <div className="language-bar">
                    <div className="bar-label">Java</div>
                    <div className="bar-container">
                      <div className="bar-fill" style={{width: '15%'}}></div>
                    </div>
                    <div className="bar-value">15%</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="tab-content fade-in">
              <div className="content-header">
                <h2>Settings</h2>
                <p className="content-subtitle">Customize your experience</p>
              </div>

              <div className="settings-sections">
                <div className="settings-section">
                  <h3>Editor Preferences</h3>
                  <div className="setting-item">
                    <label>Default Language</label>
                    <select className="setting-select">
                      <option value="cpp">C++</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="c">C</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Font Size</label>
                    <select className="setting-select">
                      <option value="12">12px</option>
                      <option value="14" selected>14px</option>
                      <option value="16">16px</option>
                      <option value="18">18px</option>
                    </select>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Analysis Settings</h3>
                  <div className="setting-item">
                    <label>Auto-analyze on paste</label>
                    <input type="checkbox" className="setting-checkbox" />
                  </div>
                  <div className="setting-item">
                    <label>Show optimization suggestions</label>
                    <input type="checkbox" className="setting-checkbox" defaultChecked />
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Notifications</h3>
                  <div className="setting-item">
                    <label>Analysis completion</label>
                    <input type="checkbox" className="setting-checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <label>Error detection</label>
                    <input type="checkbox" className="setting-checkbox" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="tab-content fade-in">
              <div className="content-header">
                <h2>Profile</h2>
                <p className="content-subtitle">Your account information</p>
              </div>

              <div className="profile-card">
                <div className="profile-avatar">
                  {isGuest ? '👤' : currentUser.charAt(0).toUpperCase()}
                </div>
                <div className="profile-info">
                  <h3>{isGuest ? 'Guest User' : currentUser}</h3>
                  <p>{isGuest ? 'Temporary Account' : 'Member'}</p>
                </div>
              </div>

              {isGuest && (
                <div className="upgrade-banner">
                  <div className="banner-icon">⚡</div>
                  <div className="banner-content">
                    <h4>Upgrade to Full Account</h4>
                    <p>Create an account to save your projects permanently and unlock more features!</p>
                  </div>
                  <button 
                    className="btn-upgrade"
                    onClick={() => navigate("/login")}
                  >
                    Create Account
                  </button>
                </div>
              )}

              <div className="profile-stats">
                <div className="profile-stat">
                  <span className="stat-label">Member Since</span>
                  <span className="stat-value">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="profile-stat">
                  <span className="stat-label">Total Projects</span>
                  <span className="stat-value">{projects.length}</span>
                </div>
                <div className="profile-stat">
                  <span className="stat-label">Code Analyzed</span>
                  <span className="stat-value">{analytics.codeAnalyzed} files</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE PROJECT MODAL */}
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
              <label>Project Name</label>
              <input
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