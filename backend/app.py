import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure Gemini
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/ping", methods=["GET"])
def ping():
    print("✅ Ping received")
    return jsonify({"status": "ok"})

def calculate_quality_score(analysis):
    """Calculate code quality score (0-100) based on analysis results"""
    score = 100
    
    # Deduct points for errors (max -40)
    error_count = len(analysis.get('errors', []))
    score -= min(error_count * 10, 40)
    
    # Deduct points for complexity (max -30)
    time_complexity = analysis.get('time_complexity', '').lower()
    if 'o(n^3)' in time_complexity or 'o(2^n)' in time_complexity or 'o(n!)' in time_complexity:
        score -= 30
    elif 'o(n^2)' in time_complexity:
        score -= 20
    elif 'o(n log n)' in time_complexity:
        score -= 10
    elif 'o(n)' in time_complexity:
        score -= 5
    
    # Deduct points for suggestions (max -30)
    suggestion_count = len(analysis.get('suggestions', []))
    score -= min(suggestion_count * 5, 30)
    
    return max(0, min(100, score))

@app.route("/analyze", methods=["POST"])
def analyze():
    print("✅ Analyze request received")
    try:
        data = request.get_json(force=True)
        print(f"📦 Received data: {data}")

        code = data.get("code", "")
        language = data.get("language", "cpp")

        if not code.strip():
            return jsonify({"error": "Code is empty"}), 400

        prompt = f"""
Analyze the following {language} code and return your response as valid JSON.

CRITICAL: Return ONLY a JSON object. No markdown, no code blocks, no explanation text before or after.

The JSON must have this exact structure:
{{
  "time_complexity": "O(n) - explanation here",
  "space_complexity": "O(1) - explanation here",
  "errors": ["error 1", "error 2"],
  "suggestions": ["suggestion 1", "suggestion 2"],
  "optimized_code": "the optimized code here"
}}

Important:
- time_complexity and space_complexity MUST include Big-O notation and brief explanation
- errors should be an array of specific issues found (empty array if no errors)
- suggestions should be an array of improvement recommendations (at least 2-3 if possible)
- optimized_code should be the improved version of the code

Code to analyze:
{code}
"""
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt
        )
        
        text = response.text.strip()
        print(f"🤖 Raw Gemini response:\n{text}\n")
        
        # Remove markdown code blocks if present
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        
        text = text.strip()
        
        # Try to find JSON object
        start = text.find("{")
        end = text.rfind("}") + 1

        if start == -1 or end == 0:
            print("❌ No JSON found in response")
            return jsonify({
                "error": "AI did not return valid JSON",
                "raw_response": text[:500]
            }), 500

        json_text = text[start:end]
        print(f"📋 Extracted JSON:\n{json_text}\n")
        
        parsed = json.loads(json_text)
        
        # Ensure all required fields exist
        if "errors" not in parsed:
            parsed["errors"] = []
        if "suggestions" not in parsed:
            parsed["suggestions"] = []
        if "time_complexity" not in parsed:
            parsed["time_complexity"] = "Unknown"
        if "space_complexity" not in parsed:
            parsed["space_complexity"] = "Unknown"
        if "optimized_code" not in parsed:
            parsed["optimized_code"] = code

        # Calculate quality score
        parsed["quality_score"] = calculate_quality_score(parsed)

        return jsonify(parsed)
    
    except json.JSONDecodeError as e:
        print(f"❌ JSON Parse Error: {str(e)}")
        print(f"❌ Problematic text: {text[:500] if 'text' in locals() else 'N/A'}")
        return jsonify({
            "error": f"Failed to parse AI response: {str(e)}",
            "time_complexity": "Error",
            "space_complexity": "Error",
            "errors": ["Unable to analyze code - AI returned invalid format"],
            "suggestions": [],
            "optimized_code": code,
            "quality_score": 0
        }), 200
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({
            "error": str(e),
            "time_complexity": "Error",
            "space_complexity": "Error",
            "errors": [f"Analysis failed: {str(e)}"],
            "suggestions": [],
            "optimized_code": code,
            "quality_score": 0
        }), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000, host='127.0.0.1')