from app.schemas.base import SuccessResponse, ErrorResponse, TimestampedModel
from app.schemas.city import Climate, CityBase, CityCreate, CityInDB, Coordinates
from app.schemas.phrase import (
    PhraseBase,
    PhraseBookmark,
    PhraseCategory,
    PhraseCreate,
    PhraseInDB,
    PhraseRegister,
    PhraseSearchRequest,
    PhraseUpdate,
)
from app.schemas.tip import CityTipBase, CityTipCreate, CityTipInDB

__all__ = [
    "SuccessResponse",
    "ErrorResponse",
    "TimestampedModel",
    "Coordinates",
    "Climate",
    "CityBase",
    "CityCreate",
    "CityInDB",
    "PhraseCategory",
    "PhraseRegister",
    "PhraseBase",
    "PhraseCreate",
    "PhraseUpdate",
    "PhraseInDB",
    "PhraseBookmark",
    "PhraseSearchRequest",
    "CityTipBase",
    "CityTipCreate",
    "CityTipInDB",
]