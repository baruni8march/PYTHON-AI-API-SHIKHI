from pydantic import BaseModel
from typing import Optional, Dict, Any

class TriageRequest(BaseModel):
    symptoms: str
    age: Optional[int] = None
    gender: Optional[str] = None
    language: Optional[str] = "en"


class VitalsRequest(BaseModel):
    bp_systolic: int
    bp_diastolic: int
    heart_rate: int
    temperature_f: float
    spo2: int
    glucose: Optional[int] = None


class LabReportRequest(BaseModel):
    extracted_text: str
    patient_age: Optional[int] = None
    patient_gender: Optional[str] = None

class TranslationRequest(BaseModel):
    text: str
    source_language: Optional[str] = "auto"
    target_language: Optional[str] = "English"
    purpose: Optional[str] = "medical"

class TTSRequest(BaseModel):
    text: str
    language: Optional[str] = "Bangla"
    voice: Optional[str] = None
    rate: Optional[str] = "+0%"


class ReportRequest(BaseModel):
    patient_name: Optional[str] = "Unknown Patient"
    age: Optional[int] = None
    gender: Optional[str] = None
    symptoms: Optional[str] = None
    triage_result: Optional[Dict[str, Any]] = None
    vitals_result: Optional[Dict[str, Any]] = None
    lab_result: Optional[Dict[str, Any]] = None
    final_advice: Optional[str] = None