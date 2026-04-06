from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import httpx
from app.config import settings

router = APIRouter(prefix="/api", tags=["translate"])


class TranslateRequest(BaseModel):
    q: str = Field(..., min_length=1, description="Text to translate")
    source: str = Field(default="auto", description="Source language code or 'auto'")
    target: str = Field(..., min_length=2, description="Target language code (e.g. 'es')")
    format: str = Field(default="text", description="'text' or 'html'")


class TranslateResponse(BaseModel):
    translatedText: str


@router.post("/translate", response_model=TranslateResponse)
async def translate(payload: TranslateRequest) -> TranslateResponse:
    """Translate text using LibreTranslate."""
    base_url = settings.translation_api_base_url.rstrip("/")
    url = f"{base_url}/translate"

    body = {
        "q": payload.q,
        "source": payload.source,
        "target": payload.target,
        "format": payload.format,
    }

    try:
        async with httpx.AsyncClient(timeout=20) as client:
            r = await client.post(url, json=body)
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=502,
            detail=f"Translation service unreachable: {e!s}",
        )

    if r.status_code != 200:
        try:
            err = r.json()
        except Exception:
            err = r.text
        raise HTTPException(status_code=502, detail=err)

    data = r.json()
    if "translatedText" not in data:
        raise HTTPException(
            status_code=502,
            detail="Translation service returned no translatedText",
        )

    return TranslateResponse(translatedText=data["translatedText"])
