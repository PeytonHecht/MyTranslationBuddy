from fastapi import APIRouter, HTTPException
import httpx
import logging
from app.schemas.translation import TranslationCreate
from app.config import settings

logger = logging.getLogger("uvicorn.error")
router = APIRouter(prefix="/api", tags=["translate"])


async def _translate_via_libretranslate(text: str, source: str, target: str) -> str:
    """Try LibreTranslate (local Docker). Returns translated text or raises."""
    libretranslate_url = settings.libretranslate_url.rstrip("/")
    payload = {
        "q": text,
        "source": source,
        "target": target,
        "format": "text",
    }
    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.post(
            f"{libretranslate_url}/translate",
            json=payload,
            headers={"Content-Type": "application/json"},
        )
    if response.status_code < 200 or response.status_code >= 300:
        raise Exception(f"LibreTranslate {response.status_code}: {response.text}")
    data = response.json()
    translated = data.get("translatedText")
    if not translated:
        raise Exception(f"Unexpected LibreTranslate response: {data}")
    return translated


async def _translate_via_mymemory(text: str, source: str, target: str) -> str:
    """Fallback: MyMemory Translation API (free, no key needed)."""
    langpair = f"{source}|{target}"
    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(
            "https://api.mymemory.translated.net/get",
            params={"q": text, "langpair": langpair},
        )
    if response.status_code != 200:
        raise Exception(f"MyMemory {response.status_code}: {response.text}")
    data = response.json()
    logger.info("MyMemory raw response: %s", data)
    match = data.get("responseData", {}).get("translatedText")
    if match is None:
        raise Exception(f"Unexpected MyMemory response: {data}")
    return match


@router.post("/translate")
async def translate(req: TranslationCreate):
    source = req.source_language.value
    target = req.target_language.value
    text = req.source_text

    # Try LibreTranslate first (works locally with Docker)
    try:
        translated = await _translate_via_libretranslate(text, source, target)
        return {"translation": translated}
    except Exception as e:
        logger.info("LibreTranslate unavailable (%s), falling back to MyMemory", e)

    # Fallback to MyMemory (works everywhere, no API key needed)
    try:
        translated = await _translate_via_mymemory(text, source, target)
        return {"translation": translated}
    except Exception as e:
        logger.error("MyMemory fallback also failed: %s", e, exc_info=True)
        raise HTTPException(
            status_code=503,
            detail=f"Translation services unavailable. Error: {e}",
        )