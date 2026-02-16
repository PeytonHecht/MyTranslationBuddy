from fastapi import APIRouter

router = APIRouter(tags=["health"])

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "MyTranslationBuddy backend is running"
    }

@router.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to MyTranslationBuddy API",
        "version": "1.0.0",
        "docs": "/docs"
    }