import os
import json
from typing import List
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    # Basic Config
    app_name: str = os.getenv("APP_NAME", "MyTranslationBuddy")
    app_version: str = os.getenv("APP_VERSION", "1.0.0")
    debug: bool = os.getenv("DEBUG", "True").lower() == "true"

    # Database
    mongodb_uri: str = os.getenv("MONGODB_URI", "")
    database_name: str = os.getenv("DATABASE_NAME", "translation_buddy")

    # Security
    secret_key: str = os.getenv("SECRET_KEY", "super-secret-key")
    algorithm: str = os.getenv("ALGORITHM", "HS256")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

    # CORS - This allows your React app (port 5173) to talk to the server
    cors_origins: List[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://localhost:5173"
    ]


settings = Settings()