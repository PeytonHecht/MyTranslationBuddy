from fastapi import Request
from fastapi.responses import JSONResponse
from app.exceptions import AppException
import traceback
import logging

logger = logging.getLogger(__name__)

async def exception_handler(request: Request, exc: Exception):
    """Global exception handler"""
    
    if isinstance(exc, AppException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "message": exc.message,
                "error_code": exc.__class__.__name__
            }
        )
    
    # Log unexpected errors
    logger.error(f"Unexpected error: {str(exc)}")
    logger.error(traceback.format_exc())
    
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal server error",
            "error_code": "INTERNAL_SERVER_ERROR"
        }
    )
