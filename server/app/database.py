from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase, AsyncIOMotorCollection
from app.config import settings


class DatabaseManager:
    """Manages a specific MongoDB database and its collections"""
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
    
    def get_collection(self, name: str) -> AsyncIOMotorCollection:
        """Get a collection by name"""
        return self.db[name]


class CitiesDialectsDB(DatabaseManager):
    """Cities, dialects, and tips database"""
    
    @property
    def cities(self) -> AsyncIOMotorCollection:
        return self.get_collection("cities")
    
    @property
    def city_tips(self) -> AsyncIOMotorCollection:
        return self.get_collection("city_tips")


class UsersAuthDB(DatabaseManager):
    """User accounts, authentication, and profiles"""
    
    @property
    def users(self) -> AsyncIOMotorCollection:
        return self.get_collection("users")
    
    @property
    def user_sessions(self) -> AsyncIOMotorCollection:
        return self.get_collection("user_sessions")


class TranslationHistoryDB(DatabaseManager):
    """User translation history and saved translations"""
    
    @property
    def translations(self) -> AsyncIOMotorCollection:
        return self.get_collection("translations")
    
    @property
    def saved_translations(self) -> AsyncIOMotorCollection:
        return self.get_collection("saved_translations")


class PhrasesVocabularyDB(DatabaseManager):
    """Phrases, vocabulary, and learning materials"""
    
    @property
    def phrases(self) -> AsyncIOMotorCollection:
        return self.get_collection("phrases")
    
    @property
    def phrase_categories(self) -> AsyncIOMotorCollection:
        return self.get_collection("phrase_categories")


class Database:
    """Main database connection manager for all databases"""
    
    def __init__(self) -> None:
        self.client: AsyncIOMotorClient | None = None
        self.cities_dialects: CitiesDialectsDB | None = None
        self.users_auth: UsersAuthDB | None = None
        self.translation_history: TranslationHistoryDB | None = None
        self.phrases_vocabulary: PhrasesVocabularyDB | None = None
    
    async def connect(self) -> None:
        """Connect to MongoDB and initialize all database managers"""
        self.client = AsyncIOMotorClient(settings.mongodb_uri)
        
        # Initialize database managers
        self.cities_dialects = CitiesDialectsDB(
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