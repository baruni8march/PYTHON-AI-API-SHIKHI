import re


def clean_number(value: str):
    value = value.replace(",", "").strip()
    try:
        return float(value)
    except ValueError:
        return None


def find_value(text: str, patterns):
    for pattern in patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return clean_number(match.group(1))
    return None


def analyze_hemoglobin(value, gender=None):
    if value is None:
        return None

    gender = gender.lower() if gender else ""

    if gender == "male":
        low_limit = 13.0
    elif gender == "female":
        low_limit = 12.0
    else:
        low_limit = 12.0

    if value < 8:
        status = "critical"
        message = "Hemoglobin is very low. Severe anemia risk may be present."
    elif value < low_limit:
        status = "warning"
        message = "Hemoglobin is low. Anemia may be possible."
    elif value > 18:
        status = "warning"
        message = "Hemoglobin is higher than expected."
    else:
        status = "normal"
        message = "Hemoglobin looks within expected range."

    return {
        "test_name": "Hemoglobin",
        "value": value,
        "unit": "g/dL",
        "status": status,
        "message": message
    }


def analyze_platelet(value):
    if value is None:
        return None

    if value < 50000:
        status = "critical"
        message = "Platelet count is very low. Bleeding risk may be high."
    elif value < 150000:
        status = "warning"
        message = "Platelet count is low."
    elif value > 450000:
        status = "warning"
        message = "Platelet count is high."
    else:
        status = "normal"
        message = "Platelet count looks within expected range."

    return {
        "test_name": "Platelet Count",
        "value": value,
        "unit": "/cmm",
        "status": status,
        "message": message
    }


def analyze_wbc(value):
    if value is None:
        return None

    if value < 2000:
        status = "critical"
        message = "WBC count is very low. Infection risk may be serious."
    elif value < 4500:
        status = "warning"
        message = "WBC count is low."
    elif value > 20000:
        status = "critical"
        message = "WBC count is very high. Serious infection or inflammation may be possible."
    elif value > 11000:
        status = "warning"
        message = "WBC count is high. Infection or inflammation may be possible."
    else:
        status = "normal"
        message = "WBC count looks within expected range."

    return {
        "test_name": "WBC Count",
        "value": value,
        "unit": "/cmm",
        "status": status,
        "message": message
    }


def analyze_blood_sugar(value):
    if value is None:
        return None

    if value < 70:
        status = "critical"
        message = "Blood sugar is low. Immediate attention may be needed."
    elif value >= 300:
        status = "critical"
        message = "Blood sugar is very high. Urgent medical advice is recommended."
    elif value >= 200:
        status = "warning"
        message = "Blood sugar is high."
    else:
        status = "normal"
        message = "Blood sugar does not look dangerously high in this demo rule."

    return {
        "test_name": "Random Blood Sugar",
        "value": value,
        "unit": "mg/dL",
        "status": status,
        "message": message
    }


def analyze_creatinine(value):
    if value is None:
        return None

    if value >= 2:
        status = "critical"
        message = "Creatinine is high. Kidney-related issue may need urgent review."
    elif value > 1.3:
        status = "warning"
        message = "Creatinine is slightly high. Doctor review is recommended."
    else:
        status = "normal"
        message = "Creatinine looks within expected range."

    return {
        "test_name": "Serum Creatinine",
        "value": value,
        "unit": "mg/dL",
        "status": status,
        "message": message
    }


def get_overall_status(results):
    has_critical = any(item["status"] == "critical" for item in results)
    has_warning = any(item["status"] == "warning" for item in results)

    if has_critical:
        return "Red"

    if has_warning:
        return "Yellow"

    return "Green"


def get_recommendation(overall_status):
    if overall_status == "Red":
        return "Critical lab abnormality found. Doctor or emergency referral is recommended."

    if overall_status == "Yellow":
        return "Some abnormal lab values found. Doctor consultation is recommended."

    return "No major abnormality detected by this demo analyzer."


def analyze_lab_report(extracted_text: str, patient_gender=None):
    hb = find_value(extracted_text, [
        r"(?:hemoglobin|hb)\s*[:\-]?\s*([0-9]+(?:\.[0-9]+)?)"
    ])

    platelet = find_value(extracted_text, [
        r"(?:platelet count|platelets|plt)\s*[:\-]?\s*([0-9,]+(?:\.[0-9]+)?)"
    ])

    wbc = find_value(extracted_text, [
        r"(?:wbc count|wbc|white blood cell count)\s*[:\-]?\s*([0-9,]+(?:\.[0-9]+)?)"
    ])

    sugar = find_value(extracted_text, [
        r"(?:random blood sugar|rbs|blood sugar|glucose)\s*[:\-]?\s*([0-9,]+(?:\.[0-9]+)?)"
    ])

    creatinine = find_value(extracted_text, [
        r"(?:serum creatinine|creatinine)\s*[:\-]?\s*([0-9]+(?:\.[0-9]+)?)"
    ])

    results = []

    for item in [
        analyze_hemoglobin(hb, patient_gender),
        analyze_platelet(platelet),
        analyze_wbc(wbc),
        analyze_blood_sugar(sugar),
        analyze_creatinine(creatinine)
    ]:
        if item is not None:
            results.append(item)

    if not results:
        return {
            "overall_status": "Unknown",
            "summary": "No known lab values were found in the text.",
            "extracted_values": [],
            "abnormal_findings": [],
            "recommendation": "Try clearer OCR text or upload a clearer image.",
            "safety_note": "This is a demo analyzer, not a final medical diagnosis."
        }

    overall_status = get_overall_status(results)

    abnormal_findings = [
        item for item in results
        if item["status"] in ["warning", "critical"]
    ]

    return {
        "overall_status": overall_status,
        "summary": f"{len(results)} lab values found and analyzed.",
        "extracted_values": results,
        "abnormal_findings": abnormal_findings,
        "recommendation": get_recommendation(overall_status),
        "safety_note": "This is rule-based demo support, not a final medical diagnosis."
    }