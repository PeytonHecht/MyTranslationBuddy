import motor.motor_asyncio
import logging
from app.config import settings

logger = logging.getLogger(__name__)

client: motor.motor_asyncio.AsyncIOMotorClient = None
db: motor.motor_asyncio.AsyncIOMotorDatabase = None


async def connect_to_mongo():
    """Initialize the MongoDB connection."""
    global client, db
    logger.info("Connecting to MongoDB...")
    client = motor.motor_asyncio.AsyncIOMotorClient(settings.mongodb_url)
    db = client[settings.database_name]
    logger.info("✓ Connected to MongoDB")


async def close_mongo_connection():
    """Close the MongoDB connection."""
    global client
    if client is not None:
        client.close()
        logger.info("✓ MongoDB connection closed")


async def init_indexes():
    """Create necessary database indexes."""
    global db
    if db is None:
        return
    try:
        await db["translations"].create_index("user_id")
        await db["translations"].create_index("created_at")
        logger.info("✓ Database indexes initialized")
    except Exception as e:
        logger.warning(f"Could not create indexes: {e}")
