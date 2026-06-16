import os
import json
import base64
from openai import OpenAI
from prompts.ocr_prompt import OCR_SYSTEM_PROMPT


try:
    from google import genai
    from google.genai import types
except ImportError:
    genai = None
    types = None


def mock_ocr_response(filename: str):
    return {
        "extracted_text": "Mock OCR text: Hemoglobin 7.5 g/dL, Platelet 45000, WBC 12000, Fever noted.",
        "document_type": "lab_report",
        "confidence": "medium",
        "important_values_found": [
            "Hemoglobin 7.5 g/dL",
            "Platelet 45000",
            "WBC 12000"
        ],
        "file_name": filename,
        "api_used": "mock",
        "note": "Mock response because no real API key was found."
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


def image_to_base64(image_bytes: bytes):
    return base64.b64encode(image_bytes).decode("utf-8")


def extract_text_with_gemini(image_bytes: bytes, filename: str, content_type: str):
    api_key = os.getenv("GEMINI_API_KEY")
    model = os.getenv("GEMINI_MODEL", "gemini-3.5-flash")

    if not api_key:
        return None

    if genai is None or types is None:
        raise ValueError(
            "google-genai is not installed. Run: python -m pip install google-genai"
        )

    client = genai.Client(api_key=api_key)

    user_prompt = f"""
{OCR_SYSTEM_PROMPT}

File name: {filename}

Extract all readable medical text from this image.
Return valid JSON only.
"""

    response = client.models.generate_content(
        model=model,
        contents=[
            types.Part.from_bytes(
                data=image_bytes,
                mime_type=content_type
            ),
            user_prompt
        ]
    )

    ai_text = response.text

    if not ai_text:
        raise ValueError("Gemini did not return any text.")

    result = extract_json_from_text(ai_text)
    result["file_name"] = filename
    result["api_used"] = "gemini"

    return result


def extract_text_with_openai(image_bytes: bytes, filename: str, content_type: str):
    api_key = os.getenv("OPENAI_API_KEY")
    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

    if not api_key:
        return None

    base64_image = image_to_base64(image_bytes)

    client = OpenAI(api_key=api_key)

    response = client.responses.create(
        model=model,
        input=[
            {
                "role": "system",
                "content": OCR_SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": "Extract all readable medical text from this image. Return valid JSON only."
                    },
                    {
                        "type": "input_image",
                        "image_url": f"data:{content_type};base64,{base64_image}"
                    }
                ]
            }
        ]
    )

    ai_text = response.output_text
    result = extract_json_from_text(ai_text)
    result["file_name"] = filename
    result["api_used"] = "openai"

    return result


def extract_text_from_image(image_bytes: bytes, filename: str, content_type: str):
    gemini_result = extract_text_with_gemini(
        image_bytes=image_bytes,
        filename=filename,
        content_type=content_type
    )

    if gemini_result:
        return gemini_result

    openai_result = extract_text_with_openai(
        image_bytes=image_bytes,
        filename=filename,
        content_type=content_type
    )

    if openai_result:
        return openai_result

    return mock_ocr_response(filename)

# Previously:

# OCR used OpenAI first

# Now:

# Gemini API first
# OpenAI API second
# Mock fallback last