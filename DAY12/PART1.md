#OCR(Optical Character Recognition) Image Upload + Text Extraction API

This API will accept a lab report / prescription image and extract text from it.Today we will use AI vision OCR with mock fallback.
-----------------------------------------------------
1.after activating venv: python -m pip install python-multipart

2.python -m pip freeze > requirements.txt

3.folder struct:
PART1/
│
├── main.py
├── schemas.py
├── .env
├── .gitignore
├── requirements.txt
│
├── prompts/
│   ├── triage_prompt.py
│   └── ocr_prompt.py          ← new
│
└── services/
    ├── triage_service.py
    ├── vitals_service.py
    └── ocr_service.py         ← new


    ----------------------------------------------------
             CODE CHANGES

## New imports
from fastapi import FastAPI, HTTPException, UploadFile, File

Meaning:
FastAPI = create app
HTTPException = send error response
UploadFile = receive uploaded file
File = tell FastAPI this input is a file

##New service import
from services.ocr_service import extract_text_from_image
This imports our OCR logic

#New route
@app.post("/ocr/extract")
async def ocr_extract(file: UploadFile = File(...)):
This creates:POST /ocr/extract
Why async?
Because reading uploaded file uses:await file.read()
This reads the image bytes.

##Image check
if not file.content_type.startswith("image/"):
This stops users from uploading wrong files like:
.exe
.zip
.txt
For today, we only accept images.
