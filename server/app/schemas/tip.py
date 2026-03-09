from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class CityTipBase(BaseModel):
    city_slug: str = Field(..., description="Slug of the city this tip belongs to")
    category: str = Field(..., description="e.g. transportation, housing, food_drink, events, etiquette")
    title: str
    content: str

    short_description: Optional[str] = None
    tags: List[str] = []
    priority: int = 0
    source_name: Optional[str] = None
    source_url: Optional[str] = None


class CityTipCreate(CityTipBase):
    pass


class CityTipInDB(CityTipBase):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)