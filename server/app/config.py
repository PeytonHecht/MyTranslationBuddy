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
        "http://localhost:3000",  # React dev server
        "http://localhost",
        "http://127.0.0.1",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
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

    #Smartcat api
    smartcat_base_url: str = os.getenv("SMARTCAT_BASE_URL", "https://us.smartcat.ai").rstrip("/")
    smartcat_account_id: str = os.getenv("SMARTCAT_ACCOUNT_ID", "b6ac15a1-f293-4d35-86b5-7d29ba80846e")
    smartcat_api_key: str = os.getenv("SMARTCAT_API_KEY", "2_oLX2JLS3rIPdiX2460d8BwSkd")
    smartcat_profile_id: str = os.getenv("SMARTCAT_PROFILE_ID", "69d5c0167a70d2bd05db1206")

settings = Settings()