from pydantic import BaseModel
from typing import Optional


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