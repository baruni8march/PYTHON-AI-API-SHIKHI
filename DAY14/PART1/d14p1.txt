#### Text-to-Speech API ####

Goal:POST /tts/speak

Text input দিবে, API audio MP3 return করবে.

We will use edge-tts, a Python package for Microsoft Edge online TTS service. It can generate speech from Python and does not need an API key

-------------------------------------------------
1.python -m pip install edge-tts
python -m pip freeze > requirements.txt

2.at .gitignore: generated_audio