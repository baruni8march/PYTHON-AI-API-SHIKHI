import os
import uuid
import edge_tts


def choose_voice(language: str, voice: str = None):
    if voice:
        return voice

    language = language.lower()

    if language in ["bangla", "bengali", "bn"]:
        return "bn-BD-NabanitaNeural"

    if language in ["english", "en"]:
        return "en-US-AriaNeural"

    return "bn-BD-NabanitaNeural"


async def generate_tts_audio(text: str, language: str = "Bangla", voice: str = None, rate: str = "+0%"):
    output_folder = "generated_audio"
    os.makedirs(output_folder, exist_ok=True)

    selected_voice = choose_voice(language, voice)

    file_name = f"tts_{uuid.uuid4().hex}.mp3"
    file_path = os.path.join(output_folder, file_name)

    communicate = edge_tts.Communicate(
        text=text,
        voice=selected_voice,
        rate=rate
    )

    await communicate.save(file_path)

    return {
        "file_path": file_path,
        "file_name": file_name,
        "voice_used": selected_voice
    }