from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.config import settings
from app.database import connect_to_mongo, close_mongo_connection, init_indexes
from app.exceptions import AppException
from app.middleware.error_handler import exception_handler
from app.routes import health, phrases, cities, tips, auth, events, translate

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan context manager"""
    # Startup
    logger.info("Starting MyTranslationBuddy backend...")
    await connect_to_mongo()
    await init_indexes()
    logger.info("✓ Application started successfully")

    yield

    # Shutdown
    logger.info("Shutting down MyTranslationBuddy backend...")
    await close_mongo_connection()
    logger.info("✓ Application shut down successfully")


# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    description="Translation API powered by MyTranslationBuddy",
    version=settings.app_version,
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add exception handlers
app.add_exception_handler(AppException, exception_handler)
app.add_exception_handler(Exception, exception_handler)

# Include routers
app.include_router(health.router)
app.include_router(phrases.router)
app.include_router(cities.router)
app.include_router(tips.router)
app.include_router(auth.router)
app.include_router(events.router)
app.include_router(translate.router)


# Additional health endpoint
@app.get("/api/v1/health")
async def api_health():
    """API health endpoint"""
    return {"status": "ok", "service": "MyTranslationBuddy"}