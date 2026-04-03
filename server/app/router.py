from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
import os

app = FastAPI()

TRANSLATION_API_BASE_URL = os.getenv("TRANSLATION_API_BASE_URL", "http://localhost:5000")

class TranslateRequest(BaseModel):
    text: str
    target_lang: str

class TranslateResponse(BaseModel):
    translatedText: str

@app.post("/api/translate", response_model=TranslateResponse)
async def translate(request: TranslateRequest):
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{TRANSLATION_API_BASE_URL}/translate", json={"q": request.text, "target": request.target_lang})
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())
    return TranslateResponse(translatedText=response.json()["translatedText"])
