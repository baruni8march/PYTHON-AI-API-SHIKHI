import os
import json

try:
    from google import genai
except ImportError:
    genai = None

from prompts.final_prompt import FINAL_SYSTEM_PROMPT
from services.translation_service import translate_medical_text
from services.triage_service import analyze_symptoms
from services.vitals_service import analyze_vitals
from services.lab_service import analyze_lab_report
from services.report_service import create_health_report


STATUS_RANK = {
    "Unknown": 0,
    "Green": 1,
    "Yellow": 2,
    "Red": 3,
    "Black": 4
}


def extract_json_from_text(text: str):
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}") + 1

        if start != -1 and end > start:
            return json.loads(text[start:end])

        raise ValueError("Gemini did not return valid JSON")


def get_highest_status(statuses):
    highest = "Unknown"

    for status in statuses:
        if status and STATUS_RANK.get(status, 0) > STATUS_RANK.get(highest, 0):
            highest = status

    return highest


def get_backup_final_result(final_status):
    if final_status == "Black":
        advice = "Life-threatening condition may be present. Immediate emergency medical help is needed."
        referral = "emergency"

    elif final_status == "Red":
        advice = "High-risk findings found. Urgent doctor or emergency referral is recommended."
        referral = "urgent"

    elif final_status == "Yellow":
        advice = "Some warning signs found. Doctor consultation and close monitoring are recommended."
        referral = "same_day"

    elif final_status == "Green":
        advice = "No major danger detected by the system. Continue observation and routine care."
        referral = "routine"

    else:
        advice = "Not enough information was provided. Please add symptoms, vitals, or lab report data."
        referral = "routine"

    return {
        "final_risk_level": final_status,
        "main_reason": "Backup rule-based result because Gemini is missing or unavailable.",
        "possible_health_concerns": [],
        "urgent_warning_signs": [],
        "patient_friendly_advice": advice,
        "doctor_referral": referral,
        "confidence": "medium",
        "safety_note": "This is AI-assisted support, not a final diagnosis.",
        "api_used": "backup_rules"
    }


def get_gemini_final_assessment(payload: dict, backup_status: str):
    api_key = os.getenv("GEMINI_API_KEY")
    model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

    if not api_key:
        return get_backup_final_result(backup_status)

    if genai is None:
        raise ValueError(
            "google-genai is not installed. Run: python -m pip install google-genai"
        )

    client = genai.Client(api_key=api_key)

    prompt = f"""
{FINAL_SYSTEM_PROMPT}

Requested output language:
{payload.get("output_language")}

Complete patient case:
{json.dumps(payload, indent=2, ensure_ascii=False)}

Give final assessment in valid JSON only.
"""

    response = client.models.generate_content(
        model=model,
        contents=prompt
    )

    if not response.text:
        raise ValueError("Gemini did not return any text.")

    result = extract_json_from_text(response.text)
    result["api_used"] = "gemini"

    return result


def final_assessment(data):
    statuses = []

    translation_result = None
    triage_result = None
    vitals_result = None
    lab_result = None

    symptoms_text = data.symptoms
    symptoms_for_triage = symptoms_text

    if symptoms_text:
        if data.input_language and data.input_language.lower() not in ["english", "en"]:
            translation_result = translate_medical_text(
                text=symptoms_text,
                source_language=data.input_language,
                target_language="English",
                purpose="medical triage"
            )

            symptoms_for_triage = translation_result.get("translated_text", symptoms_text)

        else:
            translation_result = {
                "detected_language": "English",
                "translated_text": symptoms_text,
                "api_used": "not_needed"
            }

        triage_result = analyze_symptoms(
            symptoms=symptoms_for_triage,
            age=data.age,
            gender=data.gender,
            language="en"
        )

        statuses.append(triage_result.get("triage_score"))

    if data.vitals:
        vitals_result = analyze_vitals(data.vitals)
        statuses.append(vitals_result.get("overall_status"))

    if data.lab_text:
        lab_result = analyze_lab_report(
            extracted_text=data.lab_text,
            patient_gender=data.gender
        )

        statuses.append(lab_result.get("overall_status"))

    rule_based_status = get_highest_status(statuses)

    full_payload = {
        "patient": {
            "name": data.patient_name,
            "age": data.age,
            "gender": data.gender
        },
        "original_symptoms": symptoms_text,
        "symptoms_for_triage": symptoms_for_triage,
        "translation_result": translation_result,
        "triage_result": triage_result,
        "vitals_result": vitals_result,
        "lab_result": lab_result,
        "rule_based_status": rule_based_status,
        "output_language": data.output_language
    }

    final_ai_result = get_gemini_final_assessment(
        payload=full_payload,
        backup_status=rule_based_status
    )

    pdf_report = None

    if data.generate_pdf:
        report_data = {
            "patient_name": data.patient_name,
            "age": data.age,
            "gender": data.gender,
            "symptoms": symptoms_text,
            "triage_result": triage_result,
            "vitals_result": vitals_result,
            "lab_result": lab_result,
            "final_advice": final_ai_result
        }

        pdf_report = create_health_report(report_data)
        pdf_report["download_url"] = f"/report/download/{pdf_report['file_name']}"

    return {
        "patient": full_payload["patient"],
        "translation_result": translation_result,
        "triage_result": triage_result,
        "vitals_result": vitals_result,
        "lab_result": lab_result,
        "rule_based_status": rule_based_status,
        "final_ai_result": final_ai_result,
        "pdf_report": pdf_report,
        "safety_note": "This is an AI-assisted hackathon system, not a final medical diagnosis. Always verify with a qualified doctor."
    }