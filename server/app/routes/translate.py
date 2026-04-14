from fastapi import APIRouter, HTTPException
import httpx
import logging
import urllib.parse
from app.schemas.translation import TranslationCreate
from app.config import settings

logger = logging.getLogger("uvicorn.error")
router = APIRouter(prefix="/api", tags=["translate"])

# Lingva Translate mirrors (free Google Translate proxies, no API key, no rate limits)
LINGVA_MIRRORS = [
    "https://lingva.ml",
    "https://lingva.thedaviddelta.com",
    "https://translate.plausibility.cloud",
]


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


async def _translate_via_lingva(text: str, source: str, target: str) -> str:
    """Fallback: Lingva Translate (free Google Translate proxy, no key or limits)."""
    encoded_text = urllib.parse.quote(text)
    for mirror in LINGVA_MIRRORS:
        try:
            url = f"{mirror}/api/v1/{source}/{target}/{encoded_text}"
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.get(url)
            if response.status_code == 200:
                data = response.json()
                translated = data.get("translation")
                if translated:
                    return translated
        except Exception:
            continue
    raise Exception("All Lingva mirrors failed")


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
        logger.info("LibreTranslate unavailable (%s), trying Lingva", e)

    # Fallback: Lingva Translate (Google Translate proxy, no limits)
    try:
        translated = await _translate_via_lingva(text, source, target)
        return {"translation": translated}
    except Exception as e:
        logger.error("All translation services failed: %s", e)
        raise HTTPException(
            status_code=503,
            detail="Translation service temporarily unavailable. Please try again later.",
        )