# API Contract

## Architecture

React Frontend → Node.js Backend → Python AI Backend

Frontend should call Node.js backend only. Node.js backend will call Python AI backend when AI processing is needed.

## Local Base URLs

### Python AI Backend

```txt
http://127.0.0.1:8000
```

### Node.js Backend

```txt
http://127.0.0.1:5000
```

### React Frontend

```txt
http://127.0.0.1:5173
```

## Standard Response Format

### Success Response

```json
{
  "success": true,
  "message": "Request successful",
  "data": {},
  "error": null
}
```

### Error Response

```json
{
  "success": false,
  "message": "Request failed",
  "data": null,
  "error": {
    "message": "Request failed",
    "details": {}
  }
}
```

## Language Values

```txt
bn = Bangla
en = English
banglish = Banglish input
```

## Output Format Values

```txt
chat = normal chat output
pdf = PDF report output
```

## Node.js Backend Routes

### GET /api/health

Purpose: Check Node backend health.

Response includes:

* service
* status
* default language
* supported languages
* Python AI backend URL

### GET /api/profile/me

Purpose: Return demo patient profile.

Response includes:

* patient id
* Bangla name
* English name
* age
* gender
* phone
* location
* blood group
* preferred language
* UI mode

### GET /api/dashboard/summary

Purpose: Return dashboard summary.

Response includes:

* Bangla greeting
* English greeting
* total reports
* high risk alerts
* pending reviews
* quick actions
* offline mode message

### GET /api/reports

Purpose: Return report history.

Response includes:

* report id
* Bangla title
* English title
* risk level
* output type
* created date

## Node.js AI Proxy Routes

### POST /api/ai/final-assess

Purpose: Send final health assessment request to Python backend.

Node route:

```txt
POST /api/ai/final-assess
```

Python route called:

```txt
POST /final/assess
```

Example request:

```json
{
  "language": "bn",
  "symptoms": "আমার জ্বর এবং কাশি আছে",
  "output_format": "chat"
}
```

### POST /api/ai/vitals

Purpose: Send vitals data to Python backend.

Node route:

```txt
POST /api/ai/vitals
```

Python route called:

```txt
POST /vitals/analyze
```

Example request:

```json
{
  "language": "bn",
  "temperature": 101,
  "pulse": 95,
  "oxygen": 97
}
```

### POST /api/ai/lab

Purpose: Send lab report text/data to Python backend.

Node route:

```txt
POST /api/ai/lab
```

Python route called:

```txt
POST /lab/analyze
```

### POST /api/ai/ocr

Purpose: Send image/OCR input to Python backend.

Node route:

```txt
POST /api/ai/ocr
```

Python route called:

```txt
POST /ocr/extract
```

## Python AI Backend Responsibilities

Python backend handles:

* Triage
* Vitals analysis
* OCR
* Lab report analysis
* Prescription understanding
* Voice transcription
* Translation
* TTS
* PDF report generation
* Final assessment

## Frontend Rules

1. Frontend calls Node.js backend only.
2. Frontend does not call Python backend directly.
3. Frontend must include selected language when needed.
4. Frontend should show Bangla by default.
5. Frontend should allow English toggle.
6. Frontend should support chat output and PDF output.
7. Frontend should show emergency warnings clearly.

## Safety Rules

1. Always show AI safety note.
2. Do not show AI response as final diagnosis.
3. For red flags, show urgent doctor/hospital warning.
4. For unclear handwriting, ask user to upload clearer image.
5. For serious cases, recommend doctor visit immediately.
