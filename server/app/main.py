from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel  # <-- Added this import for our user data model
import logging

from app.config import settings
from app.database import connect_to_mongo, close_mongo_connection, init_indexes
from app.exceptions import AppException
from app.middleware.error_handler import exception_handler
from app.routes import health

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


# Additional health endpoint
@app.get("/api/v1/health")
async def api_health():
    """API health endpoint"""
    return {"status": "ok", "service": "MyTranslationBuddy"}


# --- AUTHENTICATION ROUTES ---

# 1. Define the structure of the data React is sending
class UserAuth(BaseModel):
    email: str
    password: str


# 2. Catch the Register request
@app.post("/api/register")
async def register(user: UserAuth):
    logger.info(f"Frontend successfully sent registration for: {user.email}")

    # TODO: Connect to MongoDB here to actually save the user!
    # For now, we return a success response so your React app navigates to the login page.
    return {"message": "User registered successfully", "email": user.email}


# 3. Catch the Login request
@app.post("/api/login")
async def login(user: UserAuth):
    logger.info(f"Frontend successfully sent login for: {user.email}")

    # TODO: Connect to MongoDB here to check if the password matches!
    # For now, we return a fake success response so your React app logs in.
    return {"message": "Login successful", "email": user.email}