import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
from pathlib import Path

#load_dotenv()
#load_dotenv(Path(__file__).resolve().parents[1] / ".env")  # loads server/.env
ENV_PATH = Path(__file__).resolve().parents[1] / ".env"  # -> server/.env
load_dotenv(dotenv_path=ENV_PATH, override=True)

class Settings(BaseSettings):
    # Application Settings
    app_name: str = "MyTranslationBuddy"
    app_version: str = "1.0.0"
    cors_origins: list = [
        "http://localhost:5173",  # Vite dev server
        "http://localhost:5174",  # Vite fallback port
        "http://localhost:3000",  # React dev server
        "http://localhost",
        "http://127.0.0.1",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:3000",
        "https://peytonhecht.github.io",  # GitHub Pages
    ]
    
    # Database Connection
    mongodb_uri: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    mongodb_server_selection_timeout_ms: int = int(os.getenv("MONGODB_SERVER_SELECTION_TIMEOUT_MS", "5000"))
    mongodb_connect_timeout_ms: int = int(os.getenv("MONGODB_CONNECT_TIMEOUT_MS", "5000"))
    mongodb_socket_timeout_ms: int = int(os.getenv("MONGODB_SOCKET_TIMEOUT_MS", "10000"))
    mongodb_max_pool_size: int = int(os.getenv("MONGODB_MAX_POOL_SIZE", "100"))
    mongodb_min_pool_size: int = int(os.getenv("MONGODB_MIN_POOL_SIZE", "0"))
    
    # Database Names
    cities_db: str = os.getenv("CITIES_DB", "cities_info")
    users_db: str = os.getenv("USERS_DB", "users_auth")
    translations_db: str = os.getenv("TRANSLATIONS_DB", "translation_history")
    phrases_db: str = os.getenv("PHRASES_DB", "phrases_vocabulary")

    # LibreTranslate — local Docker instance
    libretranslate_url: str = os.getenv("LIBRETRANSLATE_URL", "http://localhost:5050")

    # Smartcat API (legacy — replaced by LibreTranslate)
    smartcat_base_url: str = os.getenv("SMARTCAT_BASE_URL", "https://us.smartcat.ai").rstrip("/")
    smartcat_account_id: str = os.getenv("SMARTCAT_ACCOUNT_ID", "")
    smartcat_api_key: str = os.getenv("SMARTCAT_API_KEY", "")
    smartcat_profile_id: str = os.getenv("SMARTCAT_PROFILE_ID", "")

    # Ticketmaster API — must be set in .env
    ticketmaster_api_key: str = os.getenv("TICKETMASTER_API_KEY", "")

    # Google OAuth — must match the client ID used in the frontend
    google_client_id: str = os.getenv("GOOGLE_CLIENT_ID", "")

    # JWT
    jwt_secret: str = os.getenv("JWT_SECRET", "change-me-in-production")
    jwt_algorithm: str = "HS256"
    jwt_expire_hours: int = 72  # 3 days

settings = Settings()

# Warn if JWT secret is the insecure default
if settings.jwt_secret == "change-me-in-production":
    import warnings
    warnings.warn(
        "⚠️  JWT_SECRET is set to the insecure default! "
        "Set a strong random secret in your .env file: "
        "python -c \"import secrets; print(secrets.token_hex(32))\"",
        stacklevel=1,
    )