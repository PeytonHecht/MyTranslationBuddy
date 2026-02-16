from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class LanguageCode(str, Enum):
    ENGLISH = "en"
    SPANISH = "es"
    FRENCH = "fr"
    GERMAN = "de"
    PORTUGUESE = "pt"
    CHINESE = "zh"
    JAPANESE = "ja"

class TranslationCreate(BaseModel):
    source_text: str = Field(min_length=1, max_length=5000)
    source_language: LanguageCode
    target_language: LanguageCode
    
    class Config:
        json_schema_extra = {
            "example": {
                "source_text": "Hello, how are you?",
                "source_language": "en",
                "target_language": "es"
            }
        }

class TranslationResponse(BaseModel):
    id: str = Field(alias="_id")
    user_id: str
    source_text: str
    translated_text: str
    source_language: str
    target_language: str
    created_at: datetime
    
    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "_id": "507f1f77bcf86cd799439012",
                "user_id": "507f1f77bcf86cd799439011",
                "source_text": "Hello",
                "translated_text": "Hola",
                "source_language": "en",
                "target_language": "es"
            }
        }