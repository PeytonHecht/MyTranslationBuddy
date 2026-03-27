from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class Coordinates(BaseModel):
    lat: float
    lng: float


class Climate(BaseModel):
    type: str
    summers: str
    winters: str
    note: Optional[str] = None


class CityBase(BaseModel):
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
    languages_official: List[str] = []
    dialect: Optional[str] = None
    english_friendliness: Optional[str] = None

    tagline: Optional[str] = None
    known_for: List[str] = []
    industries: List[str] = []

    cost_of_living_tier: Optional[str] = None
    expat_friendliness: Optional[str] = None

    international_airport: Optional[str] = None
    airport_distance_km: Optional[int] = None

    climate: Climate
    
    # Additional optional fields for completeness
    description: Optional[str] = None
    image_url: Optional[str] = None
    tags: Optional[List[str]] = None
    priority: Optional[int] = None
    source_name: Optional[str] = None


class CityCreate(CityBase):
    pass


class CityInDB(CityBase):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)