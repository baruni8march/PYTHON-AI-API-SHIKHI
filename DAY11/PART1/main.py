from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from schemas import TriageRequest, VitalsRequest
from services.triage_service import analyze_symptoms
from services.vitals_service import analyze_vitals


app = FastAPI(title="D11 AI Healthcare API")


@app.get("/")
def home():
    return {
        "message": "D11 Python FastAPI AI Healthcare API is running"
    }


@app.post("/triage")
def triage(request: TriageRequest):
    try:
        result = analyze_symptoms(
            symptoms=request.symptoms,
            age=request.age,
            gender=request.gender,
            language=request.language
        )

        return {
            "success": True,
            "data": result
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


@app.post("/vitals/analyze")
def vitals_analyze(request: VitalsRequest):
    try:
        result = analyze_vitals(request)

        return {
            "success": True,
            "data": result
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )