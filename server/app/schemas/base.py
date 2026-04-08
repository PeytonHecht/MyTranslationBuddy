from pydantic import BaseModel, Field, ConfigDict
from typing import Generic, TypeVar, Optional
from datetime import datetime

T = TypeVar('T')

class SuccessResponse(BaseModel, Generic[T]):
    """Generic success response wrapper"""
    success: bool = True
    message: str = "Operation successful"
    data: Optional[T] = None
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "success": True,
                "message": "Operation successful",
                "data": {},
            }
        }
    )

class ErrorResponse(BaseModel):
    """Error response wrapper"""
    success: bool = False
    message: str
    error_code: Optional[str] = None
    
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "success": False,
                "message": "An error occurred",
                "error_code": "UNKNOWN_ERROR",
            }
        }
    )

class TimestampedModel(BaseModel):
    """Base model with timestamp fields"""
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)