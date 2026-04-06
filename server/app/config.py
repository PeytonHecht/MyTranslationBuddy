import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


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


settings = Settings()