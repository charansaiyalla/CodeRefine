import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import AnalysisPanel from "../components/AnalysisPanel";
import Toast from "../components/Toast";

export default function EditorPage() {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const MAX_LINES = 1000;
  const API_TIMEOUT = 20000; // 20 seconds

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 4000);
  };

  const validateCode = (code) => {
    // Check if code is empty
    if (!code || !code.trim()) {
      return { valid: false, error: "Please enter some code to analyze" };
    }

    // Check code length by lines
    const lines = code.split('\n').length;
    if (lines > MAX_LINES) {
      return { 
        valid: false, 
        error: `Code is too long. Maximum ${MAX_LINES} lines allowed (you have ${lines} lines)` 
      };
    }

    // Check for minimum code length (at least 10 characters)
    if (code.trim().length < 10) {
      return { 
        valid: false, 
        error: "Code is too short. Please enter a meaningful code snippet" 
      };
    }

    return { valid: true };
  };

  const handleRefine = async (code, language) => {
    // Validate code
    const validation = validateCode(code);
    if (!validation.valid) {
      setError(validation.error);
      showToast(validation.error, "error");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAnalysis(null);

      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: code,
          language: language
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      // Validate response structure
      if (!data.time_complexity && !data.space_complexity && !data.errors && !data.suggestions) {
        throw new Error("Invalid response from server");
      }

      setAnalysis(data);
      showToast("Code analyzed successfully!", "success");

    } catch (err) {
      let errorMessage = "Failed to analyze code";
      
      if (err.name === 'AbortError') {
        errorMessage = "Request timeout. The analysis took too long. Please try with smaller code.";
      } else if (err.message.includes("Failed to fetch")) {
        errorMessage = "Cannot connect to backend. Please make sure the server is running.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      showToast(errorMessage, "error");
      
      // Provide fallback response on complete failure
      if (err.name === 'AbortError' || err.message.includes("Failed to fetch")) {
        setAnalysis({
          time_complexity: "Unable to analyze",
          space_complexity: "Unable to analyze",
          errors: ["Analysis service unavailable. Please try again later."],
          suggestions: ["Check your internet connection", "Ensure the backend server is running"],
          optimized_code: code,
          quality_score: 0
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApplyOptimized = (optimizedCode) => {
    const confirmApply = window.confirm(
      "This will replace your current code with the optimized version. Continue?"
    );
    
    if (confirmApply) {
      setCode(optimizedCode);
      showToast("✓ Optimized code applied successfully!", "success");
    }
  };

  return (
    <>
      <div className="editor-layout">
        <CodeEditor 
          onRefine={handleRefine}
          code={code}
          setCode={setCode}
          loading={loading}
        />

        <AnalysisPanel
          analysis={analysis}
          loading={loading}
          error={error}
          onApplyOptimized={handleApplyOptimized}
        />
      </div>

      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "" })}
        />
      )}
    </>
  );
}