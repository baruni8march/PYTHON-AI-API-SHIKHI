import os
import json

try:
    from google import genai
except ImportError:
    genai = None

from prompts.translation_prompt import TRANSLATION_SYSTEM_PROMPT


def mock_translation_response(text: str, target_language: str):
    return {
        "detected_language": "Banglish/Mixed",
        "translated_text": "I have fever and cough for two days.",
        "medical_keywords": ["fever", "cough"],
        "simple_summary": "The patient says they have fever and cough.",
        "confidence": "medium",
        "target_language": target_language,
        "api_used": "mock",
        "safety_note": "Mock translation. Use real Gemini API for actual translation."
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


def translate_medical_text(
    text: str,
    source_language: str = "auto",
    target_language: str = "English",
    purpose: str = "medical"
):
    api_key = os.getenv("GEMINI_API_KEY")
    model = os.getenv("GEMINI_MODEL", "gemini-3.5-flash")

    if not api_key:
        return mock_translation_response(text, target_language)

    if genai is None:
        raise ValueError("google-genai not installed. Run: python -m pip install google-genai")

    client = genai.Client(api_key=api_key)

    prompt = f"""
{TRANSLATION_SYSTEM_PROMPT}

Input text:
{text}

Source language:
{source_language}

Target language:
{target_language}

Purpose:
{purpose}

Translate the text and return valid JSON only.
"""

    response = client.models.generate_content(
        model=model,
        contents=prompt
    )

    if not response.text:
        raise ValueError("Gemini did not return any text.")

    result = extract_json_from_text(response.text)
    result["target_language"] = target_language
    result["api_used"] = "gemini"

    return result