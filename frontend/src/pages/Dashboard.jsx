import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/dashboard.css"

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [projectName, setProjectName] = useState("")
  const navigate = useNavigate()

const deleteProject = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this project?"
  )

  if (!confirmDelete) return

  const updated = projects.filter((p) => p.id !== id)
  setProjects(updated)
  localStorage.setItem("projects", JSON.stringify(updated))
}


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("projects")) || []
    setProjects(saved)
  }, [])

  const createProject = () => {
    if (!projectName.trim()) return

    const newProject = {
      id: Date.now(),
      name: projectName
    }

    const updated = [...projects, newProject]
    setProjects(updated)
    localStorage.setItem("projects", JSON.stringify(updated))

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
        <h2>CodeRefine Dashboard</h2>
        <button
          onClick={() => {
            localStorage.clear()
            navigate("/")
          }}
        >
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <button className="new-btn" onClick={() => setShowModal(true)}>
          + New Project
        </button>

        <div className="project-list">
  {projects.map((p) => (
    <div key={p.id} className="project-card">
      <span onClick={() => openProject(p)}>{p.name}</span>

      <button
        className="delete-btn"
        onClick={() => deleteProject(p.id)}
      >
        🗑
      </button>
    </div>
  ))}
</div>

      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Create New Project</h3>
            <input
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <button onClick={createProject}>Create</button>
          </div>
        </div>
      )}
    </div>
  )
}
