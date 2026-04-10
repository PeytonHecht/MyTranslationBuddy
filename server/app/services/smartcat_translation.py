import os
from typing import Optional

import httpx


class SmartcatTranslationError(RuntimeError):
    pass


def _base_url() -> str:
    return os.getenv("SMARTCAT_BASE_URL", "https://smartcat.ai").rstrip("/")


def _auth() -> tuple[str, str]:
    account_id = os.getenv("b6ac15a1-f293-4d35-86b5-7d29ba80846e")
    api_key = os.getenv("2_oLX2JLS3rIPdiX2460d8BwSkd")
    if not account_id or not api_key:
        raise SmartcatTranslationError(
            "SMARTCAT_ACCOUNT_ID/SMARTCAT_API_KEY are not set. Check your .env loading."
        )
    # Smartcat Basic Auth: username=AccountId, password=ApiKey
    return (account_id, api_key)


async def smart_translate_text(
    *,
    text: str,
    source_lang: str,
    target_lang: str,
    profile_id: Optional[str] = None,
) -> str:
    url = f"{_base_url()}/api/integration/v1/smartTranslation/translate"

    payload = {
        "text": text,
        "sourceLanguage": source_lang,
        "targetLanguage": target_lang,
    }
    if profile_id:
        payload["profileId"] = profile_id

    timeout = httpx.Timeout(30.0, connect=10.0)

    async with httpx.AsyncClient(timeout=timeout) as client:
        resp = await client.post(url, json=payload, auth=_auth())

    if resp.status_code < 200 or resp.status_code >= 300:
        raise SmartcatTranslationError(f"Smartcat {resp.status_code}: {resp.text}")

    data = resp.json()

    # Be tolerant about response shapes
    translation = data.get("translation") or data.get("translatedText") or data.get("translated_text")
    if not translation:
        raise SmartcatTranslationError(f"Unexpected Smartcat response: {data}")

    return translation