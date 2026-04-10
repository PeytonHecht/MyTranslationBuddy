from fastapi import APIRouter, HTTPException
import httpx
import os
import logging
import base64  
from app.schemas.translation import TranslationCreate
from dotenv import load_dotenv
from app.config import settings

#load_dotenv()  # add this before anything reads os.getenv()

logger = logging.getLogger("uvicorn.error")
router = APIRouter(prefix="/api", tags=["translate"])

#SMARTCAT_BASE_URL = os.getenv("SMARTCAT_BASE_URL", "https://us.smartcat.ai").rstrip("/")
#SMARTCAT_ACCOUNT_ID = os.getenv("SMARTCAT_ACCOUNT_ID", "b6ac15a1-f293-4d35-86b5-7d29ba80846e")
#SMARTCAT_API_KEY = os.getenv("SMARTCAT_API_KEY", "2_oLX2JLS3rIPdiX2460d8BwSkd")
#SMARTCAT_PROFILE_ID = os.getenv("SMARTCAT_PROFILE_ID", "69d5c0167a70d2bd05db1206")

@router.post("/translate")
async def translate(req: TranslationCreate):
    smartcat_base_url = os.getenv("SMARTCAT_BASE_URL", "https://us.smartcat.ai").rstrip("/")
    account_id = os.getenv("SMARTCAT_ACCOUNT_ID")
    api_key = os.getenv("SMARTCAT_API_KEY")
    profile_id = os.getenv("SMARTCAT_PROFILE_ID")


    logger.warning("DEBUG cwd=%s", os.getcwd())
    logger.warning("DEBUG SMARTCAT_ACCOUNT_ID=%r", account_id)
    logger.warning("DEBUG SMARTCAT_API_KEY_set=%s", bool(api_key))



    if not account_id or not api_key:
        raise HTTPException(
            status_code=500,
            detail="Smartcat credentials not configured (SMARTCAT_ACCOUNT_ID / SMARTCAT_API_KEY).",
        )

    url = f"{smartcat_base_url}/api/integration/v1/smartTranslation/translate"

    payload = {
        "texts": [{"text": req.source_text}],  # object with a "value" key
        "sourceLanguage": req.source_language.value,
        "targetLanguages": [req.target_language.value],
    }

    if profile_id:
        payload["profileId"] = profile_id

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:

            credentials = f"{account_id}:{api_key}"
            token = base64.b64encode(credentials.encode("utf-8")).decode("ascii")
            headers = {
                "Authorization": f"Basic {token}",
                "Content-Type": "application/json",
            }

            response = await client.post(url, json=payload, headers=headers)

        if response.status_code < 200 or response.status_code >= 300:
            raise HTTPException(status_code=502, detail=f"Smartcat error {response.status_code}: {response.text}")

        data = response.json()
        # response is likely a list of results, one per input text
        translation = None
        if isinstance(data, list) and data:
            translation = data[0].get("translation") or data[0].get("translatedText")
        else:
            translation = data.get("translation") or data.get("translatedText")

        if not translation:
            raise HTTPException(status_code=502, detail=f"Unexpected Smartcat response: {data}")

        return {"translation": translation}

    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Smartcat API timed out")