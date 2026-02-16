from fastapi import HTTPException, status

class AppException(Exception):
    """Base application exception"""
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class ResourceNotFoundError(AppException):
    def __init__(self, resource: str, resource_id: str = ""):
        message = f"{resource} not found"
        if resource_id:
            message += f": {resource_id}"
        super().__init__(message, status.HTTP_404_NOT_FOUND)

class ValidationError(AppException):
    def __init__(self, message: str):
        super().__init__(message, status.HTTP_422_UNPROCESSABLE_ENTITY)

class UnauthorizedError(AppException):
    def __init__(self, message: str = "Unauthorized"):
        super().__init__(message, status.HTTP_401_UNAUTHORIZED)

class ForbiddenError(AppException):
    def __init__(self, message: str = "Forbidden"):
        super().__init__(message, status.HTTP_403_FORBIDDEN)

class ConflictError(AppException):
    def __init__(self, message: str):
        super().__init__(message, status.HTTP_409_CONFLICT)