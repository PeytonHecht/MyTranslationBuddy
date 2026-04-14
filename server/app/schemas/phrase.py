import warnings
from datetime import datetime
from typing import List, Optional, Literal
from pydantic import BaseModel, Field, ConfigDict, field_validator, model_validator
from enum import Enum

# Suppress Pydantic warning: field "register" (formality level) shadows BaseModel.register()
warnings.filterwarnings("ignore", message='Field name "register"')


class PhraseCategory(str, Enum):
    """Categories for German phrases"""
    ACADEMIC = "academic"
    HOUSING = "housing"
    DINING = "dining"
    TRANSPORTATION = "transportation"
    HEALTH = "health"
    GREETINGS = "greetings"
    SOCIAL = "social"
    SHOPPING = "shopping"
    EMERGENCY = "emergency"
    EXCLAMATIONS = "exclamations"
    DAILY_LIFE = "daily_life"


class PhraseRegister(str, Enum):
    """Formality levels for phrases"""
    INFORMAL = "informal"
    NEUTRAL = "neutral"
    FORMAL = "formal"


class PhraseType(str, Enum):
    """Differentiates standard German from regional/local variations"""
    STANDARD = "standard"
    REGIONAL = "regional"
    SLANG = "slang"


class PhraseBase(BaseModel):
    model_config = ConfigDict(extra="forbid", protected_namespaces=())

    """Base schema for German phrases"""
    # Main content
    german_phrase: str = Field(..., description="The German phrase")
    english_translation: str = Field(..., description="English translation")
    pronunciation: Optional[str] = Field(None, description="Phonetic pronunciation guide")
    
    # Categorization
    category: PhraseCategory = Field(..., description="Phrase category")
    register: PhraseRegister = Field(default=PhraseRegister.NEUTRAL, description="Formality level")
    phrase_type: PhraseType = Field(default=PhraseType.STANDARD, description="Standard German, regional dialect, or local slang")
    
    # Geographic scope: can be general (all German-speaking), regional, or city-specific
    country_codes: List[str] = Field(default_factory=list, description="Country codes (DE, AT, CH) - empty = general/all countries")
    regions: List[str] = Field(default_factory=list, description="Regions (Bavaria, Berlin, Vorarlberg, etc.) - empty = general/all regions")
    city_slugs: List[str] = Field(default_factory=list, description="Cities where this phrase is used - empty = general/all cities")
    dialect_name: Optional[str] = Field(None, description="e.g., 'Bavarian', 'Berlin dialect', 'Viennese'")
    
    # Context and usage
    usage_context: str = Field(..., description="When and where to use this phrase")
    contextual_note: Optional[str] = Field(None, description="Additional context or nuances")
    cultural_note: Optional[str] = Field(None, description="Cultural significance or tips")
    
    # Media
    example_sentence: Optional[str] = Field(None, description="Example usage in a sentence")
    audio_url: Optional[str] = Field(None, description="URL to pronunciation audio")
    
    # Metadata
    tags: List[str] = Field(default_factory=list, description="Search tags")
    difficulty_level: int = Field(default=1, ge=1, le=5, description="1=beginner, 5=advanced")

    @field_validator("german_phrase", "english_translation", "usage_context", mode="before")
    @classmethod
    def normalize_required_text(cls, value: str) -> str:
        return value.strip()

    @field_validator(
        "pronunciation",
        "dialect_name",
        "contextual_note",
        "cultural_note",
        "example_sentence",
        "audio_url",
        mode="before",
    )
    @classmethod
    def normalize_optional_text(cls, value):
        if value is None:
            return None
        stripped = value.strip()
        return stripped if stripped else None

    @field_validator("country_codes")
    @classmethod
    def normalize_country_codes(cls, values: List[str]) -> List[str]:
        normalized: List[str] = []
        seen = set()
        for raw in values:
            item = raw.strip().upper()
            if not item or len(item) != 2:
                continue
            if item in seen:
                continue
            seen.add(item)
            normalized.append(item)
        return normalized

    @field_validator("regions")
    @classmethod
    def normalize_regions(cls, values: List[str]) -> List[str]:
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

    @field_validator("city_slugs")
    @classmethod
    def normalize_city_slugs(cls, values: List[str]) -> List[str]:
        normalized: List[str] = []
        seen = set()
        for raw in values:
            item = raw.strip().lower()
            if not item:
                continue
            if item in seen:
                continue
            seen.add(item)
            normalized.append(item)
        return normalized

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

    @model_validator(mode="after")
    def auto_assign_phrase_type(self):
        """Auto-assign phrase_type based on dialect_name and tags when not explicitly set.
        
        Logic:
        - If tags contain 'slang' or 'local_feel' → SLANG
        - If dialect_name is set → REGIONAL
        - Otherwise → STANDARD (default)
        """
        # Only auto-assign if phrase_type is still the default
        if self.phrase_type == PhraseType.STANDARD:
            tag_lower = {t.lower() for t in self.tags}
            if tag_lower & {"slang", "local_feel"}:
                self.phrase_type = PhraseType.SLANG
            elif self.dialect_name:
                self.phrase_type = PhraseType.REGIONAL
        return self


class PhraseCreate(PhraseBase):
    """Schema for creating phrases"""
    pass


class PhraseUpdate(BaseModel):
    """Schema for partially updating phrases"""
    model_config = ConfigDict(extra="forbid", protected_namespaces=())

    german_phrase: Optional[str] = None
    english_translation: Optional[str] = None
    pronunciation: Optional[str] = None
    category: Optional[PhraseCategory] = None
    register: Optional[PhraseRegister] = None
    phrase_type: Optional[PhraseType] = None
    city_slugs: Optional[List[str]] = None
    dialect_name: Optional[str] = None
    usage_context: Optional[str] = None
    contextual_note: Optional[str] = None
    cultural_note: Optional[str] = None
    example_sentence: Optional[str] = None
    audio_url: Optional[str] = None
    tags: Optional[List[str]] = None
    difficulty_level: Optional[int] = Field(None, ge=1, le=5)

    @field_validator("city_slugs")
    @classmethod
    def normalize_update_city_slugs(cls, values: Optional[List[str]]) -> Optional[List[str]]:
        if values is None:
            return None
        normalized: List[str] = []
        seen = set()
        for raw in values:
            item = raw.strip().lower()
            if not item:
                continue
            if item in seen:
                continue
            seen.add(item)
            normalized.append(item)
        return normalized

    @field_validator("tags")
    @classmethod
    def normalize_update_tags(cls, values: Optional[List[str]]) -> Optional[List[str]]:
        if values is None:
            return None
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


class PhraseInDB(PhraseBase):
    """Schema for phrases stored in database"""
    id: Optional[str] = Field(None, alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    model_config = ConfigDict(populate_by_name=True)


class PhraseBookmark(BaseModel):
    """Schema for bookmarked phrases"""
    model_config = ConfigDict(populate_by_name=True, extra="forbid")

    phrase_id: str = Field(..., description="ID of the phrase to bookmark")
    user_email: str = Field(..., description="Email of user who bookmarked")
    personal_notes: Optional[str] = Field(None, description="User's personal notes about the phrase")
    created_at: Optional[datetime] = Field(None)
    updated_at: Optional[datetime] = Field(None)


class PhraseSearchRequest(BaseModel):
    """Schema for phrase search requests"""
    model_config = ConfigDict(extra="forbid", protected_namespaces=())

    query: str = Field(..., min_length=1, description="Search term in English or German")
    search_type: Literal["english", "german", "all"] = Field(
        default="all",
        description="'english', 'german', or 'all'",
    )
    category: Optional[str] = None
    city_slug: Optional[str] = None
    register: Optional[str] = None
    difficulty_min: Optional[int] = Field(None, ge=1, le=5)
    difficulty_max: Optional[int] = Field(None, ge=1, le=5)

    @model_validator(mode="after")
    def validate_difficulty_bounds(self):
        if (
            self.difficulty_min is not None
            and self.difficulty_max is not None
            and self.difficulty_min > self.difficulty_max
        ):
            raise ValueError("difficulty_min cannot be greater than difficulty_max")
        return self