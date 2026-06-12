import os #used to read environment variables
import json #used to convert text to JSON format
from openai import OpenAI
from prompts.triage_prompt import SYSTEM_PROMPT

#With mock fallback, the response will look almost the same every time because we manually wrote a fake/sample response.
def mock_triage_response(symptoms: str): 
    return {
        "triage_score": "Yellow",
        "reasoning": f"Mock response: symptoms need medical attention: {symptoms}",
        "possible_conditions": ["Viral infection", "Respiratory infection"],
        "first_aid_steps": [
            "Check temperature",
            "Give rest and fluids",
            "Monitor breathing"
        ],
        "refer_to": "doctor",
        "urgency": "same day",
        "safety_warning": "This is AI assistance, not a final diagnosis."
    }


def extract_json_from_text(text: str): #sometimes ai reply can have text too so we will jst extract the json part
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}") + 1

        if start != -1 and end != -1:
            return json.loads(text[start:end])

        raise ValueError("AI did not return valid JSON")


def analyze_symptoms(symptoms: str, age=None, gender=None, language="en"):  #this is main fucn it decides whether to call openai or return mock response based on api key availability
    api_key = os.getenv("OPENAI_API_KEY")
    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

    if not api_key:
        return mock_triage_response(symptoms)

    client = OpenAI(api_key=api_key)

    user_prompt = f"""
Patient details:
Age: {age}
Gender: {gender}
Language: {language}
Symptoms: {symptoms}

Return the triage analysis in valid JSON only.
"""

    response = client.responses.create(
        model=model,
        input=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    )

    ai_text = response.output_text
    return extract_json_from_text(ai_text)

# Check API key
# ↓
# If no key, return mock response
# ↓
# If key exists, call OpenAI
# ↓
# Get AI answer
# ↓
# Convert AI answer into JSON
# ↓
# Return final result