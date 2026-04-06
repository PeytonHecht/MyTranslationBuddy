from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class PhraseBase(BaseModel):
    city_slugs: List[str] = Field(..., min_length=1)
    dialect_name: Optional[str] = None

    standard_text: Optional[str] = None
    local_phrase: str
    phonetic: Optional[str] = None
    literal_translation: Optional[str] = None
    actual_meaning: str

    usage_context: str  # greeting, farewell, social, food_drink, exclamation, transportation, etc.
    register: str       # informal, neutral, formal

    pronunciation_note: Optional[str] = None
    cultural_note: Optional[str] = None
    audio_url: Optional[str] = None
    tags: List[str] = []


class PhraseCreate(PhraseBase):
    pass


class PhraseInDB(PhraseBase):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)