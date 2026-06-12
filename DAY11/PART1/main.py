from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from schemas import TriageRequest
from services.triage_service import analyze_symptoms


app = FastAPI(title="D11P1 AI Triage API")


@app.get("/")
def home():
    return {
        "message": "D11P1 Python FastAPI AI Triage API is running"
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