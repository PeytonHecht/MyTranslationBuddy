from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict, field_validator


class CityTipBase(BaseModel):
    model_config = ConfigDict(extra="forbid")

    city_slug: str = Field(..., description="Slug of the city this tip belongs to")
    category: str = Field(..., description="e.g. transportation, housing, food_drink, events, etiquette")
    title: str
    content: str
    program: Optional[str] = Field(None, description="Name of the study abroad program or university, if applicable")

    short_description: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    priority: int = Field(default=0, ge=0)
    source_name: Optional[str] = None
    source_url: Optional[str] = None

    @field_validator("city_slug", mode="before")
    @classmethod
    def normalize_city_slug(cls, value: str) -> str:
        return value.strip().lower()

    @field_validator("category", mode="before")
    @classmethod
    def normalize_category(cls, value: str) -> str:
        return value.strip().lower()

    @field_validator("title", "content", "short_description", "program", "source_name", "source_url", mode="before")
    @classmethod
    def strip_optional_text_fields(cls, value):
        if value is None:
            return None
        stripped = value.strip()
        return stripped if stripped else None

    @field_validator("tags")
    @classmethod
    def normalize_tags(cls, values: List[str]) -> List[str]:
        normalized: List[str] = []
        seen = set()
        for raw in values:
            item = raw.strip()
            if not item:
                continue
            key = item.casefold()
            if key in seen:
                continue
            seen.add(key)
            normalized.append(item)
        return normalized


class CityTipCreate(CityTipBase):
    pass


class CityTipInDB(CityTipBase):
    id: Optional[str] = Field(default=None, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = ConfigDict(populate_by_name=True, extra="forbid")