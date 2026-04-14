from fastapi import APIRouter, HTTPException
import httpx
import logging
from app.schemas.translation import TranslationCreate

logger = logging.getLogger("uvicorn.error")
router = APIRouter(prefix="/api", tags=["translate"])

LIBRETRANSLATE_URL = "http://localhost:5000"

@router.post("/translate")
async def translate(req: TranslationCreate):
    """
    Proxy translation requests to the public LibreTranslate instance.

    Keeps the existing API contract for the frontend:
      Request:  { source_text, source_language, target_language }
      Response: { translation: "<translated text>" }
    """
    # Your schema currently uses enums (req.source_language.value, req.target_language.value).
    # Those values MUST be LibreTranslate language codes like "en", "de", "es", or "auto".
    source = (req.source_language.value or "auto").strip().lower()
    target = (req.target_language.value or "").strip().lower()
    text = (req.source_text or "").strip()

    if not text:
        raise HTTPException(status_code=400, detail="source_text is required")
    if not target:
        raise HTTPException(status_code=400, detail="target_language is required")

    payload = {
        "q": text,
        "source": source,   # "auto" allowed
        "target": target,   # e.g. "en"
        "format": "text",
        # "alternatives": 3,  # optional: enable if you want multiple options
        # api_key omitted for public instance
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{LIBRETRANSLATE_URL}/translate",
                json=payload,
                headers={"Content-Type": "application/json"},
            )

        if response.status_code < 200 or response.status_code >= 300:
            # LibreTranslate often returns useful JSON errors; include body for debugging
            raise HTTPException(
                status_code=502,
                detail=f"LibreTranslate error {response.status_code}: {response.text}",
            )

        data = response.json()
        translation = data.get("translatedText")

        if not translation:
            raise HTTPException(status_code=502, detail=f"Unexpected LibreTranslate response: {data}")

        return {"translation": translation}

    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="LibreTranslate API timed out")
    except httpx.RequestError as e:
        # network errors, DNS, connection reset, etc.
        raise HTTPException(status_code=502, detail=f"LibreTranslate request failed: {e}")