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

# List available models
print("=" * 50)
print("Available models:")
try:
    for model in client.models.list():
        print(f"  - {model.name}")
except Exception as e:
    print(f"Error listing models: {e}")
print("=" * 50)

@app.route("/ping", methods=["GET"])
def ping():
    print("✅ Ping received")
    return jsonify({"status": "ok"})

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
  "time_complexity": "O(n) explanation here",
  "errors": ["error 1", "error 2"],
  "suggestions": ["suggestion 1", "suggestion 2"],
  "optimized_code": "the optimized code here"
}}

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
            text = text[7:]  # Remove ```json
        if text.startswith("```"):
            text = text[3:]  # Remove ```
        if text.endswith("```"):
            text = text[:-3]  # Remove trailing ```
        
        text = text.strip()
        
        # Try to find JSON object
        start = text.find("{")
        end = text.rfind("}") + 1

        if start == -1 or end == 0:
            print("❌ No JSON found in response")
            return jsonify({
                "error": "AI did not return valid JSON",
                "raw_response": text[:500]  # Send first 500 chars for debugging
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
        if "optimized_code" not in parsed:
            parsed["optimized_code"] = code

        return jsonify(parsed)
    
    except json.JSONDecodeError as e:
        print(f"❌ JSON Parse Error: {str(e)}")
        print(f"❌ Problematic text: {text[:500]}")
        return jsonify({
            "error": f"Failed to parse AI response: {str(e)}",
            "time_complexity": "Error",
            "errors": ["Unable to analyze code - AI returned invalid format"],
            "suggestions": [],
            "optimized_code": code
        }), 200  # Return 200 so frontend can display the error gracefully
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({
            "error": str(e),
            "time_complexity": "Error",
            "errors": [f"Analysis failed: {str(e)}"],
            "suggestions": [],
            "optimized_code": code
        }), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000, host='127.0.0.1')