def analyze_blood_pressure(systolic: int, diastolic: int):
    if systolic >= 180 or diastolic >= 120:
        return {
            "name": "Blood Pressure",
            "value": f"{systolic}/{diastolic}",
            "status": "critical",
            "message": "Very high blood pressure. Emergency referral may be needed."
        }

    if systolic >= 140 or diastolic >= 90:
        return {
            "name": "Blood Pressure",
            "value": f"{systolic}/{diastolic}",
            "status": "warning",
            "message": "High blood pressure. Doctor consultation is recommended."
        }

    if systolic < 90 or diastolic < 60:
        return {
            "name": "Blood Pressure",
            "value": f"{systolic}/{diastolic}",
            "status": "warning",
            "message": "Low blood pressure. Monitor patient and consider referral."
        }

    return {
        "name": "Blood Pressure",
        "value": f"{systolic}/{diastolic}",
        "status": "normal",
        "message": "Blood pressure is within acceptable range."
    }


def analyze_heart_rate(heart_rate: int):
    if heart_rate >= 130:
        return {
            "name": "Heart Rate",
            "value": heart_rate,
            "status": "critical",
            "message": "Very high heart rate. Urgent medical attention may be needed."
        }

    if heart_rate > 100:
        return {
            "name": "Heart Rate",
            "value": heart_rate,
            "status": "warning",
            "message": "Heart rate is higher than normal."
        }

    if heart_rate < 50:
        return {
            "name": "Heart Rate",
            "value": heart_rate,
            "status": "warning",
            "message": "Heart rate is lower than normal."
        }

    return {
        "name": "Heart Rate",
        "value": heart_rate,
        "status": "normal",
        "message": "Heart rate is within acceptable range."
    }


def analyze_temperature(temperature_f: float):
    if temperature_f >= 104:
        return {
            "name": "Temperature",
            "value": temperature_f,
            "status": "critical",
            "message": "Very high fever. Urgent medical care is recommended."
        }

    if temperature_f >= 100.4:
        return {
            "name": "Temperature",
            "value": temperature_f,
            "status": "warning",
            "message": "Fever detected. Monitor temperature and symptoms."
        }

    if temperature_f < 95:
        return {
            "name": "Temperature",
            "value": temperature_f,
            "status": "critical",
            "message": "Very low body temperature. Emergency care may be needed."
        }

    return {
        "name": "Temperature",
        "value": temperature_f,
        "status": "normal",
        "message": "Temperature is within acceptable range."
    }


def analyze_spo2(spo2: int):
    if spo2 < 90:
        return {
            "name": "Oxygen Saturation",
            "value": spo2,
            "status": "critical",
            "message": "Low oxygen level. Urgent referral is needed."
        }

    if spo2 < 95:
        return {
            "name": "Oxygen Saturation",
            "value": spo2,
            "status": "warning",
            "message": "Oxygen level is slightly low. Monitor closely."
        }

    return {
        "name": "Oxygen Saturation",
        "value": spo2,
        "status": "normal",
        "message": "Oxygen saturation is within acceptable range."
    }


def analyze_glucose(glucose):
    if glucose is None:
        return {
            "name": "Blood Glucose",
            "value": None,
            "status": "not_provided",
            "message": "Blood glucose was not provided."
        }

    if glucose >= 300:
        return {
            "name": "Blood Glucose",
            "value": glucose,
            "status": "critical",
            "message": "Very high blood glucose. Urgent medical advice is needed."
        }

    if glucose >= 200:
        return {
            "name": "Blood Glucose",
            "value": glucose,
            "status": "warning",
            "message": "High blood glucose detected."
        }

    if glucose < 70:
        return {
            "name": "Blood Glucose",
            "value": glucose,
            "status": "critical",
            "message": "Low blood glucose. Immediate sugar intake may be needed if patient is conscious."
        }

    return {
        "name": "Blood Glucose",
        "value": glucose,
        "status": "normal",
        "message": "Blood glucose is within acceptable range."
    }


def get_overall_status(results):
    has_critical = any(item["status"] == "critical" for item in results)
    has_warning = any(item["status"] == "warning" for item in results)

    if has_critical:
        return "Red"

    if has_warning:
        return "Yellow"

    return "Green"


def get_recommendation(overall_status: str):
    if overall_status == "Red":
        return "Urgent referral is recommended. Patient should be seen by a doctor or emergency service quickly."

    if overall_status == "Yellow":
        return "Patient should be monitored and referred to a doctor if symptoms continue or worsen."

    return "Vitals look stable. Continue observation and routine care."


def analyze_vitals(vitals):
    results = [
        analyze_blood_pressure(vitals.bp_systolic, vitals.bp_diastolic),
        analyze_heart_rate(vitals.heart_rate),
        analyze_temperature(vitals.temperature_f),
        analyze_spo2(vitals.spo2),
        analyze_glucose(vitals.glucose)
    ]

    overall_status = get_overall_status(results)
    recommendation = get_recommendation(overall_status)

    abnormal_findings = [
        item for item in results
        if item["status"] in ["warning", "critical"]
    ]

    return {
        "overall_status": overall_status,
        "recommendation": recommendation,
        "all_results": results,
        "abnormal_findings": abnormal_findings,
        "safety_note": "This is rule-based support, not a final medical diagnosis."
    }