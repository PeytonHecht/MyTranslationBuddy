from fastapi import APIRouter, HTTPException
import httpx
import logging
import base64
from app.schemas.translation import TranslationCreate
from app.config import settings

logger = logging.getLogger("uvicorn.error")
router = APIRouter(prefix="/api", tags=["translate"])


@router.post("/translate")
async def translate(req: TranslationCreate):
    account_id = settings.smartcat_account_id
    api_key = settings.smartcat_api_key
    profile_id = settings.smartcat_profile_id
    smartcat_base_url = settings.smartcat_base_url

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