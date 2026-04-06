from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    app_name: str = "MyTranslationBuddy"
    app_version: str = "1.0.0"
    debug: bool = False

    mongodb_url: str = "mongodb://localhost:27017"
    database_name: str = "translation_buddy"

    secret_key: str = "change-this-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    cors_origins: List[str] = ["http://localhost:3000", "http://localhost:8000"]

    translation_api_base_url: str = "http://localhost:5000"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
