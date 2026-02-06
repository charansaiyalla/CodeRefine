import os
import json
from dotenv import load_dotenv
from groq import Groq
from flask import Flask, jsonify, request
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)
CORS(app)

# Load Groq API key
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise RuntimeError("GROQ_API_KEY not found in .env")

# Initialize Groq client
client = Groq(api_key=groq_api_key)

@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({
        "status": "success",
        "message": "CodeRefine backend is running"
    })

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.json
        code = data.get("code", "")
        language = data.get("language", "")

        if not code.strip():
            return jsonify({"error": "Code is empty"}), 400

        prompt = f"""
Analyze the following {language} code.

Return ONLY valid JSON with this structure:
{{
  "time_complexity": "",
  "errors": [],
  "suggestions": [],
  "optimized_code": ""
}}

Rules:
- Use double quotes ONLY
- No explanations
- optimized_code can be empty if no optimization is possible

Code:
{code}
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
            response_format={"type": "json_object"}
        )

        parsed = json.loads(response.choices[0].message.content)

        # 🔥 IMPORTANT FIX
        if not parsed.get("optimized_code"):
            parsed["optimized_code"] = code

        return jsonify(parsed)

    except Exception as e:
        return jsonify({
            "error": "AI parsing failed",
            "details": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)
