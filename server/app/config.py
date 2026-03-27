import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    # Application
    app_name: str = "MyTranslationBuddy"
    app_version: str = "1.0.0"
    
    # CORS
    cors_origins: list = ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"]
    
    # Database Connection
    mongodb_uri: str = os.getenv("MONGODB_URI", "mongodb+srv://admin:translationbuddy@mythranslationbuddy.r5i1k.mongodb.net/?retryWrites=true&w=majority&appName=MyTranslationBuddy")
    
    # Database Names
    cities_db: str = os.getenv("CITIES_DB", "cities_info")
    users_db: str = os.getenv("USERS_DB", "users_auth")
    translations_db: str = os.getenv("TRANSLATIONS_DB", "translation_history")
    phrases_db: str = os.getenv("PHRASES_DB", "phrases_vocabulary")


settings = Settings()