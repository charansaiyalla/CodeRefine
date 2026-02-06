import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import AnalysisPanel from "../components/AnalysisPanel";

export default function EditorPage() {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRefine = async (code, language) => {
    try {
      setLoading(true);
      setError("");
      setAnalysis(null);

      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: code,
          language: language
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Backend error");
        return;
      }

      setAnalysis(data);

    } catch (err) {
      setError("Failed to connect to backend");
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
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-toast';
      successMsg.textContent = '✓ Optimized code applied!';
      document.body.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
    }
  };

  return (
    <div className="editor-layout">
      <CodeEditor 
        onRefine={handleRefine}
        code={code}
        setCode={setCode}
      />

      <AnalysisPanel
        analysis={analysis}
        loading={loading}
        error={error}
        onApplyOptimized={handleApplyOptimized}
      />
    </div>
  );
}
