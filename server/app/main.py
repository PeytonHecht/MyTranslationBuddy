from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
import logging
import subprocess
import asyncio
import httpx

from app.config import settings
from app.database import connect_to_mongo, close_mongo_connection, init_indexes
from app.exceptions import AppException
from app.middleware.error_handler import exception_handler
from app.routes import health, phrases, cities, tips, auth, events, translate
from app.routes.auth import limiter

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def _ensure_libretranslate():
    """Make sure the LibreTranslate Docker container is running. Returns True if Docker is available."""
    try:
        # Check if Docker is available
        result = subprocess.run(
            ["docker", "ps", "--filter", "name=libretranslate", "--format", "{{.Status}}"],
            capture_output=True, text=True, timeout=10,
        )
        if result.returncode != 0:
            logger.warning("⚠ Docker not available — LibreTranslate auto-start skipped")
            return False

        if result.stdout.strip():
            logger.info("✓ LibreTranslate container already running")
            return True

        # Check if container exists but is stopped
        result_all = subprocess.run(
            ["docker", "ps", "-a", "--filter", "name=libretranslate", "--format", "{{.Status}}"],
            capture_output=True, text=True, timeout=10,
        )
        if result_all.stdout.strip():
            logger.info("↻ Starting existing LibreTranslate container...")
            subprocess.run(["docker", "start", "libretranslate"], capture_output=True, timeout=30)
        else:
            logger.info("↻ Creating & starting LibreTranslate container...")
            subprocess.run(
                [
                    "docker", "run", "-d",
                    "--name", "libretranslate",
                    "-p", "5050:5000",
                    "libretranslate/libretranslate",
                    "--load-only", "en,de,es,fr,pt",
                ],
                capture_output=True, timeout=60,
            )
        logger.info("✓ LibreTranslate container started on port 5050")
        return True
    except FileNotFoundError:
        logger.warning("⚠ Docker CLI not found — LibreTranslate must be started manually")
        return False
    except Exception as e:
        logger.warning("⚠ Could not auto-start LibreTranslate: %s", e)
        return False


async def _wait_for_libretranslate(max_wait: int = 90):
    """Wait for LibreTranslate to be ready (it can take a while to load models)."""
    url = settings.libretranslate_url.rstrip("/") + "/languages"
    for i in range(max_wait):
        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                r = await client.get(url)
                if r.status_code == 200:
                    logger.info("✓ LibreTranslate is ready")
                    return
        except Exception:
            pass
        if i == 0:
            logger.info("⏳ Waiting for LibreTranslate to load language models...")
        await asyncio.sleep(1)
    logger.warning("⚠ LibreTranslate did not become ready within %ss — translations may fail initially", max_wait)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan context manager"""
    # Startup
    logger.info("Starting MyTranslationBuddy backend...")
    docker_available = _ensure_libretranslate()
    await connect_to_mongo()
    await init_indexes()
    if docker_available:
        await _wait_for_libretranslate()
    else:
        logger.info("⏭ Skipping LibreTranslate wait (no Docker)")
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

# Add rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

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