#### PDF Report Generation API ####

Goal:POST /report/generate

It will create a PDF health report from:patient info + symptoms + triage + vitals + lab result
it wont use AI API key as well rather it uses reportLab package of python and creates pdf file locally
-------------------------------------------------------
1.python -m pip install reportlab
python -m pip freeze > requirements.txt

2.in .gitignore: generated_reports