from typing import Any

from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING
from app.config import settings


class DatabaseManager:
    """Manages a specific MongoDB database and its collections"""
    
    def __init__(self, db: Any):
        self.db = db
    
    def get_collection(self, name: str) -> Any:
        """Get a collection by name"""
        return self.db[name]


class CitiesDialectsDB(DatabaseManager):
    """Cities, dialects, and tips database"""
    
    @property
    def cities(self) -> Any:
        return self.get_collection("cities")
    
    @property
    def city_tips(self) -> Any:
        return self.get_collection("city_tips")


class UsersAuthDB(DatabaseManager):
    """User accounts, authentication, and profiles"""
    
    @property
    def users(self) -> Any:
        return self.get_collection("users")
    
    @property
    def user_sessions(self) -> Any:
        return self.get_collection("user_sessions")


class TranslationHistoryDB(DatabaseManager):
    """User translation history and saved translations"""
    
    @property
    def translations(self) -> Any:
        return self.get_collection("translations")
    
    @property
    def saved_translations(self) -> Any:
        return self.get_collection("saved_translations")


class PhrasesVocabularyDB(DatabaseManager):
    """German phrases, vocabulary, and phrase bookmarks"""
    
    @property
    def phrases(self) -> Any:
        return self.get_collection("phrases")
    
    @property
    def phrase_bookmarks(self) -> Any:
        return self.get_collection("phrase_bookmarks")
    
    @property
    def phrase_categories(self) -> Any:
        return self.get_collection("phrase_categories")


class Database:
    """Main database connection manager for all databases"""
    
    def __init__(self) -> None:
        self.client = None
        self.cities_info = None
        self.users_auth = None
        self.translation_history = None
        self.phrases_vocabulary = None
    
    async def connect(self) -> None:
        """Connect to MongoDB and initialize all database managers"""
        self.client = AsyncIOMotorClient(
            settings.mongodb_uri,
            serverSelectionTimeoutMS=settings.mongodb_server_selection_timeout_ms,
            connectTimeoutMS=settings.mongodb_connect_timeout_ms,
            socketTimeoutMS=settings.mongodb_socket_timeout_ms,
            maxPoolSize=settings.mongodb_max_pool_size,
            minPoolSize=settings.mongodb_min_pool_size,
            retryWrites=True,
        )
        
        # Initialize database managers
        self.cities_info = CitiesDialectsDB(
            self.client[settings.cities_db]
        )
        self.users_auth = UsersAuthDB(
            self.client[settings.users_db]
        )
        self.translation_history = TranslationHistoryDB(
            self.client[settings.translations_db]
        )
        self.phrases_vocabulary = PhrasesVocabularyDB(
            self.client[settings.phrases_db]
        )
        
        try:
            await self.client.admin.command("ping")
            print(f"✓ Connected to MongoDB Cluster (MyTranslationBuddy)")
            print(f"  - {settings.cities_db}")
            print(f"  - {settings.users_db}")
            print(f"  - {settings.translations_db}")
            print(f"  - {settings.phrases_db}")
        except Exception as e:
            print(f"✗ Failed to connect to MongoDB: {e}")
            raise
    
    async def close(self) -> None:
        """Close MongoDB connection"""
        if self.client:
            self.client.close()
            print("✓ Closed MongoDB connection")


db = Database()


async def connect_to_mongo() -> None:
    """Connect to MongoDB"""
    await db.connect()


async def close_mongo_connection() -> None:
    """Close MongoDB connection"""
    await db.close()


async def init_indexes() -> None:
    """Initialize database indexes for optimal query performance"""
    try:
        # Cities indexes
        await db.cities_info.cities.create_index("slug", unique=True)
        await db.cities_info.cities.create_index("country")
        await db.cities_info.cities.create_index("tags")
        await db.cities_info.cities.create_index("priority")
        await db.cities_info.cities.create_index([
            ("country", ASCENDING),
            ("priority", DESCENDING),
            ("slug", ASCENDING),
        ])
        await db.cities_info.cities.create_index([
            ("tags", ASCENDING),
            ("priority", DESCENDING),
            ("slug", ASCENDING),
        ])

        await db.cities_info.city_tips.create_index("city_slug")
        await db.cities_info.city_tips.create_index("category")
        await db.cities_info.city_tips.create_index("program")
        await db.cities_info.city_tips.create_index("priority")
        await db.cities_info.city_tips.create_index(
            [("city_slug", ASCENDING), ("title", ASCENDING)],
            unique=True,
        )
        await db.cities_info.city_tips.create_index([
            ("city_slug", ASCENDING),
            ("category", ASCENDING),
            ("priority", DESCENDING),
        ])
        await db.cities_info.city_tips.create_index([
            ("category", ASCENDING),
            ("city_slug", ASCENDING),
            ("priority", DESCENDING),
        ])
        await db.cities_info.city_tips.create_index([
            ("program", ASCENDING),
            ("priority", DESCENDING),
        ])
        
        # Phrases indexes
        await db.phrases_vocabulary.phrases.create_index("category")
        await db.phrases_vocabulary.phrases.create_index("city_slugs")
        await db.phrases_vocabulary.phrases.create_index("difficulty_level")
        await db.phrases_vocabulary.phrases.create_index("register")
        await db.phrases_vocabulary.phrases.create_index("german_phrase")
        await db.phrases_vocabulary.phrases.create_index("english_translation")
        await db.phrases_vocabulary.phrases.create_index(
            [("german_phrase", ASCENDING), ("english_translation", ASCENDING)],
            unique=True,
        )
        await db.phrases_vocabulary.phrases.create_index([
            ("category", ASCENDING),
            ("register", ASCENDING),
            ("difficulty_level", ASCENDING),
        ])
        await db.phrases_vocabulary.phrases.create_index([
            ("city_slugs", ASCENDING),
            ("category", ASCENDING),
            ("difficulty_level", ASCENDING),
            ("register", ASCENDING),
        ])
        await db.phrases_vocabulary.phrase_bookmarks.create_index(
            [("user_email", ASCENDING), ("phrase_id", ASCENDING)],
            unique=True,
        )
        await db.phrases_vocabulary.phrase_bookmarks.create_index(
            [("user_email", ASCENDING), ("created_at", DESCENDING)],
        )

        # Users indexes (auth routes currently exist, even if auth is not a focus)
        await db.users_auth.users.create_index("email", unique=True)
        
        print("✓ Database indexes initialized successfully")
    except Exception as e:
        print(f"⚠ Error initializing indexes: {e}")