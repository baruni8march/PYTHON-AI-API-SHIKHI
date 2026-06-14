from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import FileResponse

from schemas import TriageRequest, VitalsRequest, LabReportRequest, TranslationRequest, TTSRequest,ReportRequest

from services.triage_service import analyze_symptoms
from services.vitals_service import analyze_vitals
from services.ocr_service import extract_text_from_image
from services.lab_service import analyze_lab_report
from services.stt_service import transcribe_audio
from services.translation_service import translate_medical_text
from services.tts_service import generate_tts_audio
from services.report_service import create_health_report

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


@app.post("/lab/analyze")
def lab_analyze(request: LabReportRequest):
    try:
        result = analyze_lab_report(
            extracted_text=request.extracted_text,
            patient_gender=request.patient_gender
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
    
@app.post("/voice/transcribe")
async def voice_transcribe(file: UploadFile = File(...)):
    try:
        if not file.content_type.startswith("audio/"):
            raise HTTPException(
                status_code=400,
                detail="Only audio files are allowed."
            )

        audio_bytes = await file.read()

        result = transcribe_audio(
            audio_bytes=audio_bytes,
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
    
@app.post("/translate")
def translate(request: TranslationRequest):
    try:
        result = translate_medical_text(
            text=request.text,
            source_language=request.source_language,
            target_language=request.target_language,
            purpose=request.purpose
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
    
@app.post("/tts/speak")
async def tts_speak(request: TTSRequest):
    try:
        result = await generate_tts_audio(
            text=request.text,
            language=request.language,
            voice=request.voice,
            rate=request.rate
        )

        return FileResponse(
            path=result["file_path"],
            media_type="audio/mpeg",
            filename=result["file_name"]
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )
    
@app.post("/report/generate")
def report_generate(request: ReportRequest):
    try:
        result = create_health_report(request.model_dump())

        return FileResponse(
            path=result["file_path"],
            media_type="application/pdf",
            filename=result["file_name"]
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )