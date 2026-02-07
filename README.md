# CodeRefine 🚀

**Transform Your Code with AI**

An AI-powered code analysis and optimization platform that provides instant feedback on code quality, errors, and intelligent suggestions for improvement across multiple programming languages.

![CodeRefine Banner](https://img.shields.io/badge/AI-Powered-blue) ![License](https://img.shields.io/badge/license-MIT-green) ![React](https://img.shields.io/badge/React-18.x-61dafb) ![Flask](https://img.shields.io/badge/Flask-3.x-000000) ![Python](https://img.shields.io/badge/Python-3.8+-3776ab)

## ✨ Features

- **Instant Code Analysis** - Real-time code quality scoring and metrics
- **Multi-Language Support** - C++, Java, Python, and more
- **Error Detection** - Identifies compilation errors, syntax issues, and logical problems
- **Smart Suggestions** - AI-powered recommendations for code improvement
- **Code Quality Score** - Visual representation of code health (0-100 scale)
- **Project Management** - Organize and track multiple coding projects
- **User Authentication** - Secure login with Google/GitHub OAuth support

## 🏗️ Architecture

### Frontend
- **React 18** with Vite for fast development
- **React Router** for navigation
- Modern component architecture with hooks
- Responsive UI with custom CSS styling

### Backend
- **Flask** REST API
- **Python** for AI processing
- **Google Gemini API** integration for code analysis
- Session-based authentication

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**
- **pip** (Python package manager)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/coderefine.git
cd coderefine
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
FLASK_SECRET_KEY=your_secret_key_here
FLASK_ENV=development
```

**Getting a Gemini API Key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy and paste into your `.env` file

### 4. Frontend Setup

In a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm install
```

### 5. Run the Application

**Start the Backend Server:**
```bash
cd backend
python app.py
```
The backend will run on `http://localhost:5000`

**Start the Frontend Development Server:**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## 🎯 Usage

1. **Sign Up/Login** - Create an account or login with Google/GitHub
2. **Create a Project** - Start a new coding project from the dashboard
3. **Write Code** - Use the built-in code editor with syntax highlighting
4. **Analyze** - Click "Refine Code" to get instant AI-powered analysis
5. **Review Results** - View code quality score, errors, and suggestions
6. **Optimize** - Apply suggested improvements to enhance your code

## 📁 Project Structure

```
coderefine/
├── backend/
│   ├── .venv/              # Python virtual environment
│   ├── .gitkeep            # Git placeholder
│   ├── venv/               # Virtual environment files
│   ├── .env                # Environment variables
│   ├── app.py              # Flask application entry point
│   └── requirements.txt    # Python dependencies
│
├── frontend/
│   ├── node_modules/       # Node dependencies
│   ├── public/
│   │   └── vite.svg        # Vite logo
│   ├── src/
│   │   ├── assets/         # Static assets
│   │   ├── components/     # React components
│   │   │   ├── AnalysisPanel.jsx
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── OptimizedModal.jsx
│   │   │   ├── Speedometer.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── App.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── editor.jsx
│   │   │   ├── landing.jsx
│   │   │   └── login.jsx
│   │   ├── styles/         # CSS files
│   │   │   ├── common.css
│   │   │   ├── dashboard.css
│   │   │   ├── editor.css
│   │   │   ├── landing.css
│   │   │   ├── login.css
│   │   │   ├── Speedometer.css
│   │   │   ├── Toast.css
│   │   │   └── App.css
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .eslintrc.js        # ESLint configuration
│   ├── .gitignore          # Git ignore file
│   ├── index.html          # HTML entry point
│   ├── package.json        # Node dependencies
│   ├── package-lock.json   # Lock file
│   ├── README.md           # Project documentation
│   └── vite.config.js      # Vite configuration
│
└── README.md               # This file
```

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- CSS3 (Custom styling)
- ESLint for code quality

### Backend
- Flask (Python web framework)
- Google Gemini API (AI analysis)
- Python 3.8+

### Development Tools
- Git for version control
- npm for package management
- pip for Python dependencies

## 🐛 Debugging & Troubleshooting

### Common Issues

**Issue: Backend server won't start**
- Ensure virtual environment is activated
- Check if port 5000 is available
- Verify all dependencies are installed: `pip install -r requirements.txt`

**Issue: Frontend build errors**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node -v` (should be 16+)
- Clear Vite cache: `rm -rf node_modules/.vite`

**Issue: Gemini API errors**
- Verify API key is correct in `.env`
- Check API quota limits
- Ensure API key has proper permissions

**Issue: CORS errors**
- Verify backend CORS settings in `app.py`
- Check frontend API endpoint URLs
- Ensure both servers are running

### Debug Mode

Enable Flask debug mode in `.env`:
```env
FLASK_ENV=development
FLASK_DEBUG=1
```

View React development tools in browser console for component debugging.

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/oauth/google` - Google OAuth
- `GET /api/auth/oauth/github` - GitHub OAuth

### Projects
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `DELETE /api/projects/:id` - Delete project

### Code Analysis
- `POST /api/analyze` - Analyze code snippet
- `POST /api/refine` - Get optimization suggestions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Authors

- Your Name - [@charansaiyalla](https://github.com/charansaiyalla)

## 🙏 Acknowledgments

- Google Gemini AI for powering the code analysis
- React and Flask communities for excellent documentation
- Vite for blazing-fast development experience

## 📧 Contact

For questions or support, reach out at: charanysai1307@gmail.com

## 🔮 Future Enhancements

- [ ] Add more programming language support
- [ ] Implement code comparison/diff view
- [ ] Add collaborative coding features
- [ ] Integrate with GitHub repositories
- [ ] Add code performance benchmarking
- [ ] Support for custom coding standards
- [ ] Mobile application development

---

**Made with ❤️ by the CodeRefine Team**
