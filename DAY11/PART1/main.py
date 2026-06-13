from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException, UploadFile, File
from schemas import TriageRequest, VitalsRequest
from services.triage_service import analyze_symptoms
from services.vitals_service import analyze_vitals
from services.ocr_service import extract_text_from_image


app = FastAPI(title="D12 AI Healthcare API")


@app.get("/")
def home():
    return {
        "message": "D12 Python FastAPI AI Healthcare API is running"
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


@app.post("/ocr/extract")
async def ocr_extract(file: UploadFile = File(...)):
    try:
        if not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=400,
                detail="Only image files are allowed."
            )

        image_bytes = await file.read()

        result = extract_text_from_image(
            image_bytes=image_bytes,
            filename=file.filename,
            content_type=file.content_type
        )

        return {
            "success": True,
            "data": result
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )