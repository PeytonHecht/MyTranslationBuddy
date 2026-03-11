import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    # Database Connection
    mongodb_uri: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    
    # Database Names
    cities_db: str = os.getenv("CITIES_DB", "cities_info")
    users_db: str = os.getenv("USERS_DB", "users_auth")
    translations_db: str = os.getenv("TRANSLATIONS_DB", "translation_history")
    phrases_db: str = os.getenv("PHRASES_DB", "phrases_vocabulary")


settings = Settings()