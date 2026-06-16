# Healthcare AI Product Plan

## Product Vision

This project is a Bangla-first and English-supported AI healthcare assistant for rural people. The app helps users explain symptoms, upload lab reports or prescriptions, check vitals, talk with a chatbot, and receive simple health guidance.

The app will not replace doctors. It will provide basic guidance, risk level, first-aid advice, and warning signs for urgent doctor visits.

## Target Users

* Rural patients
* Elderly people
* Low-literacy users
* Village health workers
* Family caregivers
* People who have difficulty travelling to hospitals

## Core Product Principles

1. Bangla-first, English-supported.
2. Very simple UI for villagers.
3. Low internet and offline-friendly design.
4. Voice support for users who cannot type easily.
5. Clear warning when doctor visit is needed.
6. PDF report option for showing to doctors, pharmacists, or family members.
7. AI assistance only, not final diagnosis.

## Core Features for MVP

### 1. Profile Dashboard

The dashboard will show patient profile, recent reports, risk summary, quick actions, and emergency guidance.

Main cards:

* Talk to Chatbot
* Upload Lab Report
* Check Vitals
* Generate PDF Report
* View Report History

### 2. AI Chatbot

The chatbot will support:

* Bangla text
* English text
* Banglish input
* Speech-to-text
* Text-to-speech
* Simple health questions
* Follow-up questions

The chatbot should give short and simple answers for villagers.

### 3. Lab Report and Prescription Submission

Users can upload lab reports or prescription images. The system will extract text using OCR and explain the report in simple language.

It should handle:

* Printed lab reports
* Bad handwriting prescriptions
* Low-quality images
* Unclear words
* Abnormal values

If the text is unclear, the app should say that some words are unclear and ask the user to upload a clearer image or consult a doctor/pharmacist.

### 4. Vitals and Triage

Users can enter:

* Temperature
* Pulse
* Blood pressure
* Oxygen level
* Blood sugar
* Symptoms
* Age
* Gender

The system will return:

* Risk level
* Possible concern
* First-aid steps
* Doctor visit urgency
* Emergency warning signs

### 5. Output Choice

After analysis, the user can choose:

1. Normal chat output
2. PDF report output

PDF report will include:

* Patient information
* Symptoms
* Vitals
* AI analysis
* Risk level
* Recommendation
* Doctor visit warning
* Date and time

### 6. Language Support

The app will support:

* Bangla UI
* English UI
* Bangla chatbot
* English chatbot
* Banglish input understanding
* Bangla PDF report
* English PDF report

The user can switch language using a toggle:

* বাংলা
* English

### 7. Offline and Low Internet Mode

The app should support low internet users.

Offline/low-data features:

* Save form data temporarily on device
* Compress images before upload
* Show simple loading status
* Retry failed submission
* Keep UI lightweight
* Avoid heavy animations

## Future Features

### 1. Image-Based Health Guidance

User can upload face, wound, skin problem, swelling, burn, eye issue, or damaged organ image.

The app will give:

* Possible seriousness level
* Basic first-aid suggestion
* Red flag warning
* Doctor visit suggestion

The app must not give final diagnosis from image.

### 2. Medicine Store

Future medicine store features:

* Upload prescription
* Search medicine
* Order medicine from nearby pharmacy
* Home delivery request
* Cash on delivery
* Medicine availability check

This feature will need pharmacy partnership and safety rules.

### 3. Emergency Ambulance Center

Future emergency features:

* Emergency call button
* Ambulance contact
* Location sharing
* Family notification
* Nearby hospital direction

### 4. Medicine Reminder

Users can save medicine schedule and get reminders.

### 5. Chronic Disease Tracker

For diabetes, blood pressure, asthma, kidney disease, pregnancy care, and elderly care.

It can track:

* Last BP
* Last blood sugar
* Missed medicine
* Risk trend
* Doctor follow-up date

### 6. Village Health Worker Mode

A health worker can manage multiple patients, save reports, generate PDF, and help rural users.

## Safety Rules

1. Do not provide final diagnosis.
2. Always show safety note.
3. Show emergency warning for red flag symptoms.
4. If handwriting or image is unclear, do not guess.
5. For serious symptoms, advise urgent doctor or hospital visit.
6. Medicine advice must be careful and should not replace doctor prescription.

## Technical Architecture

React Frontend → Node.js Backend → Python AI Backend

### React Frontend

Responsible for:

* UI
* Dashboard
* Chatbot screen
* Forms
* Language toggle
* Dark/light mode
* PDF/chat output choice

### Node.js Backend

Responsible for:

* Profile
* Dashboard
* Report history
* Future authentication
* Future medicine store
* Future ambulance feature
* Calling Python AI backend

### Python AI Backend

Responsible for:

* OCR
* Bad handwriting extraction
* STT
* TTS
* Translation
* Triage
* Vitals analysis
* Lab report analysis
* Final assessment
* PDF report generation
