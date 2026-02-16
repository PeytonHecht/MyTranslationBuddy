from bson import ObjectId
from app.exceptions import ValidationError

def validate_object_id(id_string: str) -> ObjectId:
    """Validate and convert string to ObjectId"""
    if not ObjectId.is_valid(id_string):
        raise ValidationError(f"Invalid ID format: {id_string}")
    return ObjectId(id_string)