import os
import json

try:
    from google import genai
    from google.genai import types
except ImportError:
    genai = None
    types = None

from prompts.stt_prompt import STT_SYSTEM_PROMPT


def mock_stt_response(filename: str):
    return {
        "transcript": "Mock transcript: I have fever, cough, and chest pain for two days.",
        "language": "English",
        "symptom_keywords": ["fever", "cough", "chest pain"],
        "confidence": "medium",
        "file_name": filename,
        "api_used": "mock"
    }


def extract_json_from_text(text: str):
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}") + 1

        if start != -1 and end > start:
            return json.loads(text[start:end])

        raise ValueError("AI did not return valid JSON")


def transcribe_audio(audio_bytes: bytes, filename: str, content_type: str):
    api_key = os.getenv("GEMINI_API_KEY")
    model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

    if not api_key:
        return mock_stt_response(filename)

    if genai is None or types is None:
        raise ValueError("google-genai not installed. Run: python -m pip install google-genai")

    client = genai.Client(api_key=api_key)

    prompt = f"""
{STT_SYSTEM_PROMPT}

File name: {filename}

Transcribe this audio and return valid JSON only.
"""

    response = client.models.generate_content(
        model=model,
        contents=[
            types.Part.from_bytes(
                data=audio_bytes,
                mime_type=content_type
            ),
            prompt
        ]
    )

    if not response.text:
        raise ValueError("Gemini did not return any text.")

    result = extract_json_from_text(response.text)
    result["file_name"] = filename
    result["api_used"] = "gemini"

    return result