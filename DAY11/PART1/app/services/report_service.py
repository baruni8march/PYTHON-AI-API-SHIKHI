import os
import uuid
from datetime import datetime
from html import escape

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


def register_bangla_font():
    font_paths = [
        r"C:\Windows\Fonts\Nirmala.ttf",
        r"C:\Windows\Fonts\NirmalaB.ttf",
        r"C:\Windows\Fonts\kalpurush.ttf"
    ]

    for font_path in font_paths:
        if os.path.exists(font_path):
            pdfmetrics.registerFont(TTFont("BanglaFont", font_path))
            return "BanglaFont"

    return "Helvetica"


def safe_text(text):
    if text is None:
        return "Not provided"

    return escape(str(text)).replace("\n", "<br/>")


def add_heading(story, styles, title):
    story.append(Paragraph(f"<b>{safe_text(title)}</b>", styles["Heading"]))
    story.append(Spacer(1, 8))


def add_text(story, styles, text):
    story.append(Paragraph(safe_text(text), styles["Body"]))
    story.append(Spacer(1, 10))


def add_key_value(story, styles, key, value):
    story.append(
        Paragraph(
            f"<b>{safe_text(key)}:</b> {safe_text(value)}",
            styles["Body"]
        )
    )
    story.append(Spacer(1, 6))


def add_bullet_list(story, styles, items):
    if not items:
        add_text(story, styles, "Not provided")
        return

    for item in items:
        story.append(Paragraph(f"• {safe_text(item)}", styles["Body"]))
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 8))


def format_status(status):
    if not status:
        return "Unknown"

    status = str(status)

    if status.lower() == "red":
        return "RED - Urgent attention needed"

    if status.lower() == "yellow":
        return "YELLOW - Warning signs found"

    if status.lower() == "green":
        return "GREEN - No major danger detected"

    if status.lower() == "black":
        return "BLACK - Emergency / life-threatening"

    return status


def add_patient_info(story, styles, report_data):
    add_heading(story, styles, "Patient Information")

    add_key_value(story, styles, "Patient Name", report_data.get("patient_name"))
    add_key_value(story, styles, "Age", report_data.get("age"))
    add_key_value(story, styles, "Gender", report_data.get("gender"))


def add_symptoms(story, styles, report_data):
    add_heading(story, styles, "Patient Symptoms")
    add_text(story, styles, report_data.get("symptoms"))


def add_final_advice(story, styles, final_advice):
    add_heading(story, styles, "Final Assessment")

    if not isinstance(final_advice, dict):
        add_text(story, styles, final_advice)
        return

    add_key_value(
        story,
        styles,
        "Final Risk Level",
        format_status(final_advice.get("final_risk_level"))
    )

    add_key_value(
        story,
        styles,
        "Doctor Referral",
        final_advice.get("doctor_referral")
    )

    add_key_value(
        story,
        styles,
        "Confidence",
        final_advice.get("confidence")
    )

    add_heading(story, styles, "Main Reason")
    add_text(story, styles, final_advice.get("main_reason"))

    add_heading(story, styles, "Possible Health Concerns")
    add_bullet_list(story, styles, final_advice.get("possible_health_concerns"))

    add_heading(story, styles, "Urgent Warning Signs")
    add_bullet_list(story, styles, final_advice.get("urgent_warning_signs"))

    add_heading(story, styles, "Patient-Friendly Advice")
    add_text(story, styles, final_advice.get("patient_friendly_advice"))

    add_heading(story, styles, "AI Safety Note")
    add_text(story, styles, final_advice.get("safety_note"))


def add_triage_result(story, styles, triage_result):
    add_heading(story, styles, "AI Triage Summary")

    if not isinstance(triage_result, dict):
        add_text(story, styles, triage_result)
        return

    add_key_value(story, styles, "Triage Score", triage_result.get("triage_score"))
    add_key_value(story, styles, "Urgency", triage_result.get("urgency"))
    add_key_value(story, styles, "Refer To", triage_result.get("refer_to"))

    add_heading(story, styles, "Reasoning")
    add_text(story, styles, triage_result.get("reasoning"))

    add_heading(story, styles, "Possible Conditions")
    add_bullet_list(story, styles, triage_result.get("possible_conditions"))

    add_heading(story, styles, "First Aid Steps")
    add_bullet_list(story, styles, triage_result.get("first_aid_steps"))


def add_vitals_result(story, styles, vitals_result):
    add_heading(story, styles, "Vitals Analysis Summary")

    if not isinstance(vitals_result, dict):
        add_text(story, styles, vitals_result)
        return

    add_key_value(
        story,
        styles,
        "Overall Status",
        format_status(vitals_result.get("overall_status"))
    )

    add_heading(story, styles, "Recommendation")
    add_text(story, styles, vitals_result.get("recommendation"))

    abnormal_findings = vitals_result.get("abnormal_findings", [])

    add_heading(story, styles, "Abnormal Vitals")

    if not abnormal_findings:
        add_text(story, styles, "No abnormal vitals found.")
        return

    for item in abnormal_findings:
        name = item.get("name")
        value = item.get("value")
        status = item.get("status")
        message = item.get("message")

        add_text(
            story,
            styles,
            f"{name}: {value} | Status: {status} | {message}"
        )


def add_lab_result(story, styles, lab_result):
    add_heading(story, styles, "Lab Report Analysis Summary")

    if not isinstance(lab_result, dict):
        add_text(story, styles, lab_result)
        return

    add_key_value(
        story,
        styles,
        "Overall Status",
        format_status(lab_result.get("overall_status"))
    )

    add_heading(story, styles, "Recommendation")
    add_text(story, styles, lab_result.get("recommendation"))

    abnormal_findings = lab_result.get("abnormal_findings", [])

    add_heading(story, styles, "Abnormal Lab Findings")

    if not abnormal_findings:
        add_text(story, styles, "No abnormal lab values found.")
        return

    for item in abnormal_findings:
        test_name = item.get("test_name")
        value = item.get("value")
        unit = item.get("unit")
        status = item.get("status")
        message = item.get("message")

        add_text(
            story,
            styles,
            f"{test_name}: {value} {unit} | Status: {status} | {message}"
        )


def create_health_report(report_data: dict):
    output_folder = "generated_reports"
    os.makedirs(output_folder, exist_ok=True)

    file_name = f"health_report_{uuid.uuid4().hex}.pdf"
    file_path = os.path.join(output_folder, file_name)

    font_name = register_bangla_font()
    base_styles = getSampleStyleSheet()

    styles = {
        "Title": ParagraphStyle(
            "CustomTitle",
            parent=base_styles["Title"],
            fontName=font_name,
            fontSize=18,
            leading=24
        ),
        "Heading": ParagraphStyle(
            "CustomHeading",
            parent=base_styles["Heading2"],
            fontName=font_name,
            fontSize=13,
            leading=18,
            spaceAfter=6
        ),
        "Body": ParagraphStyle(
            "CustomBody",
            parent=base_styles["BodyText"],
            fontName=font_name,
            fontSize=10,
            leading=15
        )
    }

    doc = SimpleDocTemplate(
        file_path,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    story = []

    story.append(Paragraph("AI Healthcare Assistant Report", styles["Title"]))
    story.append(Spacer(1, 16))

    story.append(
        Paragraph(
            f"Generated on: {datetime.now().strftime('%d %B %Y, %I:%M %p')}",
            styles["Body"]
        )
    )
    story.append(Spacer(1, 20))

    add_patient_info(story, styles, report_data)
    add_symptoms(story, styles, report_data)

    add_final_advice(story, styles, report_data.get("final_advice"))

    add_triage_result(story, styles, report_data.get("triage_result"))
    add_vitals_result(story, styles, report_data.get("vitals_result"))
    add_lab_result(story, styles, report_data.get("lab_result"))

    add_heading(story, styles, "Final Safety Note")
    add_text(
        story,
        styles,
        "This report is generated by an AI-assisted demo system. "
        "It is not a final medical diagnosis. Please verify with a doctor or qualified health worker."
    )

    doc.build(story)

    return {
        "file_path": file_path,
        "file_name": file_name
    }