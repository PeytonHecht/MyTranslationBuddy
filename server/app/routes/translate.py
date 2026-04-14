from fastapi import APIRouter, HTTPException
import httpx
import logging
from app.schemas.translation import TranslationCreate
from app.config import settings

logger = logging.getLogger("uvicorn.error")
router = APIRouter(prefix="/api", tags=["translate"])


@router.post("/translate")
async def translate(req: TranslationCreate):
    libretranslate_url = settings.libretranslate_url.rstrip("/")

    payload = {
        "q": req.source_text,
        "source": req.source_language.value,
        "target": req.target_language.value,
        "format": "text",
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{libretranslate_url}/translate",
                json=payload,
                headers={"Content-Type": "application/json"},
            )

        if response.status_code < 200 or response.status_code >= 300:
            detail = response.text
            logger.error("LibreTranslate error %s: %s", response.status_code, detail)
            raise HTTPException(
                status_code=502,
                detail=f"Translation service error ({response.status_code}): {detail}",
            )

        data = response.json()
        translated = data.get("translatedText")

        if not translated:
            raise HTTPException(
                status_code=502,
                detail=f"Unexpected translation response: {data}",
            )

        return {"translation": translated}

    except httpx.ConnectError:
        raise HTTPException(
            status_code=503,
            detail="Translation service unavailable. Make sure LibreTranslate is running.",
        )
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Translation service timed out")