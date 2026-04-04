from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict, field_validator


class Coordinates(BaseModel):
    lat: float = Field(..., ge=-90, le=90)
    lng: float = Field(..., ge=-180, le=180)


class Climate(BaseModel):
    type: str
    summers: str
    winters: str
    note: Optional[str] = None


class CityBase(BaseModel):
    model_config = ConfigDict(extra="forbid")

    slug: str = Field(..., description="Unique city slug, e.g. 'munich'")
    name: str
    local_name: str
    country: str
    country_code: str = Field(..., min_length=2, max_length=2)
    region: str
    region_type: str  # e.g. "federal_state", "city_state", "national_capital"
    is_city_state: bool = False
    capital_of_region: bool = False

    population: int
    population_approx: bool = False
    coordinates: Coordinates

    timezone: str
    currency: str
    languages_official: List[str] = Field(default_factory=list)
    dialect: Optional[str] = None
    english_friendliness: Optional[str] = None

    description: Optional[str] = None
    tagline: Optional[str] = None
    known_for: List[str] = Field(default_factory=list)
    industries: List[str] = Field(default_factory=list)

    cost_of_living_tier: Optional[str] = None
    expat_friendliness: Optional[str] = None

    international_airport: Optional[str] = None
    airport_distance_km: Optional[int] = None
    image_url: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    priority: int = Field(default=0, ge=0)
    source_name: Optional[str] = None
    source_url: Optional[str] = None

    climate: Climate

    @field_validator("slug")
    @classmethod
    def normalize_slug(cls, value: str) -> str:
        return value.strip().lower()

    @field_validator("country_code")
    @classmethod
    def normalize_country_code(cls, value: str) -> str:
        return value.strip().upper()

    @field_validator("languages_official", "known_for", "industries", "tags")
    @classmethod
    def normalize_list_values(cls, values: List[str]) -> List[str]:
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


class CityCreate(CityBase):
    pass


class CityInDB(CityBase):
    id: Optional[str] = Field(default=None, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = ConfigDict(populate_by_name=True, extra="forbid")